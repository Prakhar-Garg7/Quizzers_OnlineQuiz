const Quiz = require("../models/quiz");
const User = require("../models/user");

const create = async (req, res) => {
    try {
        const { title, description, questions, startTime, duration, imageUrl } = req.body;

        console.log("startTime: ", startTime, ", duration: ", duration)

        if (!title || !description || !questions || !startTime || !duration) {
            res.status(400).json({ message: "Either title or description or questions or startTime or duration or imageUrl are not provided" });
        }
        const user = await User.findOne({ email: req.user.email });
        if (!user) {
            res.status(404).json("User not found");
        }

        const newQuiz = new Quiz({ title, description, questions, startTime: new Date(startTime).toISOString(), duration, imageUrl, creator: user._id });
        await newQuiz.save();


        if (!user.createdQuizzes) {
            user.createdQuizzes = [];
        }

        user.createdQuizzes.push(newQuiz._id);
        await user.save();

        res.status(200).json({ message: "Quiz created successfully", quiz: newQuiz });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

const getAll = async (req, res) => {
    try {
        console.log("Hello, entered to backend")
        const quizzes = await Quiz.find({});
        res.status(200).json({ message: 'Quizzes fetched successfully', quizzes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getOne = async (req, res) => {
    try {
        const quizFetched = await Quiz.findById(req.params.id);
        if (!quizFetched) res.status(404).json("Quiz not found");
        res.status(200).json({ message: 'Quiz fetched successfully', quizFetched });
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({ error: error.message });
    }
}

const getTeacherQuizzes = async (req, res) => {
    try {
        const { email } = req.user;

        // Find user by email and populate createdQuizzes
        const user = await User.findOne({ email }).populate('createdQuizzes').exec();

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Extract quizzes after population
        const quizzes = user.createdQuizzes;

        res.status(200).json({ message: "Quizzes fetched successfully", quizzes, email });
    } catch (error) {
        console.error("Error fetching teacher quizzes:", error);
        res.status(500).json({ error: error.message });
    }
};

const evaluate = async (req, res) => {
    try {
        const id = req.params.id;

        const userEmail = req.user.email;
        const user = await User.findOne({ email: userEmail });
        if (!user) return res.status(404).json("User not found");
        const userAnswers = req.body.userAnswers;
        let myMarks = 0;
        const quiz = await Quiz.findById(id);
        if (!quiz) return res.status(404).json("Quiz not found");
        for (let i = 0; i < quiz.questions.length; i++) {
            const question = quiz.questions[i];
            if (question.correctAnswer == userAnswers[i]) myMarks++;
        }
        user.marks.set(id, myMarks);

        await user.save();
        res.status(200).json({ message: "Quiz evaluated successfully", score: myMarks });
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({ error: error.message });
    }
}

const getQuizLeaderboard = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        if (!user) return res.status(404).json("User not found");
        const id = req.params.id;
        const quiz = await Quiz.findById(id);
        if (!quiz) return res.status(404).json("Quiz not found");

        let myMarks = 0;
        if (user.marks.has(id)) myMarks = user.marks.get(id);

        const users = await User.find({});
        const map = new Map();
        for (const user of users) {
            const userId = user._id;
            if (!user.marks) user.marks = new Map();
            const userMap = user.marks;
            if (userMap.has(id)) map.set(userId, userMap.get(id));
            else map.set(userId, 0);
        }

        const leaderboard = Array.from(map.entries());

        res.status(200).json({ message: "Quiz leaderboard fetched successfully", leaderboard, user, myMarks });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ error: error.message });
    }
}

const getFullLeaderboard = async (req, res) => {
    try {
        const finalMap = new Map();
        const quizzes = await Quiz.find({});

        const user = await User.findOne({ email: req.user.email });
        if (!user) return res.status(404).json("User not found");

        const myMap = new Map();
        for (const quiz of quizzes) {
            const quizId = quiz._id.toString();
            if (user.marks.has(quizId)) myMap.set(quizId, user.marks.get(quizId));
            else myMap.set(quizId, 0);
        }

        const myArr = Array.from(myMap.entries());

        const users = await User.find({});
        for (const user of users) {
            let userMap = user.marks;
            if (!userMap) userMap = new Map();
            const map1 = new Map();
            for (const quiz of quizzes) {
                const quizId = quiz._id.toString();
                if (userMap.has(quizId)) map1.set(quizId, userMap.get(quizId));
                else map1.set(quizId, 0);
            }
            finalMap.set(user._id, map1);
        }

        const leaderboard = Array.from(finalMap, ([key, innerMap]) => [key, Object.fromEntries(innerMap)]);

        res.status(200).json({ message: "Leaderboard fetched successfully", leaderboard, user, myMap: myArr });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = { create, getAll, getOne, evaluate, getQuizLeaderboard, getFullLeaderboard, getTeacherQuizzes };