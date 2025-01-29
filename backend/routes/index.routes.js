const express  = require("express")

const router = express.Router();

const authRoutes = require("./auth");
const quizRoutes = require("./quiz");

// routes
/**
 * Routes Endpoints
 */

//@routes /api/auth
router.use("/auth", authRoutes)
router.use("/quiz", quizRoutes)

//@routes /api/Quiz
// router.use("/Quiz",)


module.exports = router;