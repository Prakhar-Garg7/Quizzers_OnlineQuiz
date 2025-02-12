const express = require("express");
const { create, getAll, getOne, evaluate, getQuizLeaderboard, getFullLeaderboard,getTeacherQuizzes } = require("../controllers/quiz");
const decodeToken = require("../middleware/userVerify.middleware");
const router = express.Router();

router.post('/create', decodeToken, create);
router.get('/get', decodeToken, getAll);
router.get('/get/:id', decodeToken, getOne);
router.post('/evaluate/:id', decodeToken, evaluate);
router.get('/getQuizLeaderboard/:id', decodeToken, getQuizLeaderboard);
router.get('/getFullLeaderboard', decodeToken, getFullLeaderboard);
router.get('/teacher', decodeToken, getTeacherQuizzes);

module.exports = router;