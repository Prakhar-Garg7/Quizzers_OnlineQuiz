const express = require('express');
const { register, sendVerificationEmail, verifyEmail, login, sendForgotPasswordEmail, verifyForgotPasswordOTP, setNewPassword } = require('../controllers/auth');
const decodeToken = require('../middleware/userVerify.middleware');
const router = express.Router();

router.post('/signup', register);
router.post('/sendVerificationEmail', decodeToken, sendVerificationEmail);
router.post('/verifyEmail', verifyEmail);

router.post('/login', login);
router.post('/forgotPassowrd', sendForgotPasswordEmail);
router.post('/verifyOTP', verifyForgotPasswordOTP);
router.post('/setNewPassword', decodeToken, setNewPassword);

// Export the router
module.exports = router;
