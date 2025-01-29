const express = require("express");
const { create, getAll } = require("../controllers/quiz");
const decodeToken = require("../middleware/userVerify.middleware");
const router = express.Router();

router.post('/create', decodeToken, create);
router.get('/get', decodeToken, getAll);

module.exports = router;