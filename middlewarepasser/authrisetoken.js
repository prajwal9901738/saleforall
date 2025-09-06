import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

// Ensure this is in your main server file:
// app.use(cookieParser());

const userauth = (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized access: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded?.id) {
            return res.status(403).json({ success: false, message: "Invalid token payload" });
        }

        req.user = decoded; // contains { id: user._id, iat, exp }
        next();

    } catch (error) {
        console.error("Token verification error:", error.message);
        return res.status(403).json({ success: false, message: "Invalid or expired token" });
    }
};

export default userauth;