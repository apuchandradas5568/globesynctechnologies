import { Router } from "express";
import { userOtpVerification, userRegistration } from "../controller/users.controller.js";



const router = Router();


router.post('/register-user', userRegistration)
router.post('/otp-verify', userOtpVerification)

export default router;