import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import usermodel from "../models/usermodel.js";
import transporter from "../nodemailer.js";

// REGISTER
export const register = async (req, res) => {
    const { name, email, password } = req.body || {};

    if (!name || !email || !password) {
        return res.json({ success: false, message: "All fields are required" });
    }

    try {
        const existingUser = await usermodel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        const hashedpassword = await bcrypt.hash(password, 10);
        const newUser = new usermodel({ name, email, password: hashedpassword, isverified: false });
        
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        console.log(`Generated OTP for ${email}: ${otp}`);
        newUser.verifyotp = otp;
        newUser.verifyotpexpire = Date.now() + 10 * 60 * 1000;

        console.log("New user object before saving:", newUser);
        await newUser.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Email Verification",
            text: `Hello ${name},

Your OTP for verification is ${otp}. It is valid for 10 minutes.

If you did not request this, please ignore this email.

Best regards,
Your Service Team`
        };
        await transporter.sendMail(mailOptions);

        return res.json({ success: true, message: "Registration successful. Please verify your email to login." });

    } catch (error) {
        console.error("Register Error:", error);
        return res.json({ success: false, message: "Internal server error" });
    }
};

// LOGIN
export const login = async (req, res) => {
    const { email, password } = req.body || {};

    if (!email || !password) {
        return res.json({ success: false, message: "Email and password fields are required" });
    }

    try {
        const user = await usermodel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.json({ success: false, message: "Invalid password" });
        }

       

       
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            maxAge: 3600000,
            path: '/'
        });

        return res.json({ success: true, message: "Login successful", user });

    } catch (error) {
        console.error("Login Error:", error);
        return res.json({ success: false, message: "Internal server error" });
    }
};

// LOGOUT
export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            path: '/'
        });

        return res.json({ success: true, message: "Logout successful" });

    } catch (error) {
        console.error("Logout Error:", error);
        return res.json({ success: false, message: "Internal server error" });
    }
};

// SEND VERIFICATION EMAIL
export const sendVerificationEmail = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.json({ success: false, message: "Email is required" });
    }

    try {
        const user = await usermodel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (user.isverified) {
            return res.json({ success: false, message: "User already verified" });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.verifyotp = otp;
        user.verifyotpexpire = Date.now() + 10 * 60 * 1000;
        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Email Verification",
            text: `Hello,

Your OTP for verification is ${otp}. It is valid for 10 minutes.

If you did not request this, please ignore this email.

Best regards,
Your Service Team`
        };

        await transporter.sendMail(mailOptions);

        return res.json({ success: true, message: "Verification email sent" });

    } catch (error) {
        console.error("Verification Email Error:", error);
        return res.json({ success: false, message: "Internal server error" });
    }
};

// VERIFY OTP
export const verifyOtp = async (req, res) => {
  console.log("Executing new verifyOtp function");
  const { otp } = req.body;

  if (!otp) {
    return res.json({ success: false, message: "OTP is required" });
  }

  try {
    const user = await usermodel.findOne({ verifyotp: otp });
    if (!user) {
      return res.json({ success: false, message: "Invalid OTP. Please try again." });
    }

    const expiryTimestamp = Number(user.verifyotpexpire);
    const currentTimestamp = Date.now();

    if (currentTimestamp > expiryTimestamp) {
      return res.json({ success: false, message: "OTP has expired. Please request a new one." });
    }

    user.isverified = true;
    user.verifyotp = ""; // Clear OTP after use
    user.verifyotpexpire = null;
    await user.save();

    return res.json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    return res.json({ success: false, message: "Internal server error" });
  }
};
// CHECK IF USER IS VERIFIED
export const isverified = async (req, res) => {
    try {
        const user = await usermodel.findById(req.user.id).select("-password");
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        return res.json({ success: true, message: "User is verified", user });
    } catch (error) {
        console.error("Verification Check Error:", error);
        return res.json({ success: false, message: "Verification status could not be confirmed" });
    }
};

// PASSWORD RESET OTP
export const resetPasswordotp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.json({ success: false, message: "Email is required" });
    }

    try {
        const user = await usermodel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.resetotp = otp;
        user.resetotpexp = Date.now() + 10 * 60 * 1000;
        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Password Reset OTP",
            text: `Hello,

Your OTP for password reset is ${otp}. It is valid for 10 minutes.

If you did not request this, please ignore this email.

Best regards,
Your Service Team`
        };

        await transporter.sendMail(mailOptions);

        return res.json({ success: true, message: "Password reset OTP sent successfully" });

    } catch (error) {
        console.error("Reset Password Error:", error);
        return res.json({ success: false, message: "Internal server error" });
    }
};

// VERIFY PASSWORD RESET OTP
export const verifyResetPasswordOtp = async (req, res) => {
  const { email, otp, newpassword } = req.body;

  if (!email || !otp || !newpassword) {
    return res.status(400).json({ success: false, message: "Email, OTP, and new password are required" });
  }

  try {
    const user = await usermodel.findOne({ email, resetotp: otp });
    if (!user) {
      return res.status(404).json({ success: false, message: "Invalid OTP or email" });
    }

    if (Date.now() > user.resetotpexp) {
      return res.status(401).json({ success: false, message: "OTP has expired" });
    }

    user.password = await bcrypt.hash(newpassword, 10);
    user.resetotp = "";
    user.resetotpexp = 0;

    await user.save();

    return res.status(200).json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error("Verify Reset OTP Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};