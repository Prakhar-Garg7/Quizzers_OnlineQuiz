const express = require('express');
const { register, verify, login, setNewPassword, sendEmail } = require('../controllers/auth');
const decodeToken = require('../middleware/userVerify.middleware');
const router = express.Router();

router.post('/signup', register);
router.post('/sendEmail', decodeToken, sendEmail);
router.post('/verify', verify);

router.post('/login', login);
router.post('/setNewPassword', setNewPassword);

// Export the router
module.exports = router;
