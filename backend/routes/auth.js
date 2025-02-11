const express = require('express');
const { register, verify, login, setNewPassword, sendEmail,logout } = require('../controllers/auth');
const decodeToken = require('../middleware/userVerify.middleware');
const router = express.Router();

router.post('/signup', register);
router.post('/sendEmail', decodeToken, sendEmail);
router.post('/verify', verify);
router.post('/logout',logout)
router.post('/login', login);
router.post('/setNewPassword', setNewPassword);

// Exporting router
module.exports = router;
