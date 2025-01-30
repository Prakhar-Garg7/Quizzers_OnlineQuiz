const express = require("express");
const { create, getAll, getOne } = require("../controllers/quiz");
const decodeToken = require("../middleware/userVerify.middleware");
const router = express.Router();

router.post('/create', decodeToken, create);
router.get('/get', decodeToken, getAll);
router.get('/get/:id', decodeToken, getOne);

module.exports = router;