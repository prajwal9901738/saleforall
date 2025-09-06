import express from 'express';
import {
  isverified,
  login,
  logout,
  register,
  resetPasswordotp,
  sendVerificationEmail,
  verifyOtp,
  verifyResetPasswordOtp
} from '../controller/controller.js';
import authrisetoken from '../middlewarepasser/authrisetoken.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/otp-verify", verifyOtp);
router.post("/send-verification-email", sendVerificationEmail);
router.get("/is-verified", authrisetoken,isverified);
router.post("/send-reset-otp", resetPasswordotp);
router.post("/reset-password", verifyResetPasswordOtp);

export default router;