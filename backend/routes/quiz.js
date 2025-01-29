const express = require("express");
const { create } = require("../controllers/quiz");
const decodeToken = require("../middleware/userVerify.middleware");
const router = express.Router();

router.post('/create', decodeToken, create);

module.exports = router;