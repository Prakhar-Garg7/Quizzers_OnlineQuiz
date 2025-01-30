const Quiz = require("../models/quiz");
const User = require("../models/user");

const create = async(req, res) => {
    try{
        const {title, description, questions} = req.body;

        if(!title || !description || !questions){
            res.status(400).json({message: "Either title or description or questions are not provided"});
        }
        console.log(title,description,questions);
        const newQuiz = new Quiz({title, description, questions});
        await newQuiz.save();

        const user = await User.findOne({email: req.user.email});
        if(!user){
            res.status(404).json("User not found");
        }

        if (!user.createdQuizzes) {
            user.createdQuizzes = [];  
        }

        user.createdQuizzes.push(newQuiz._id);
        await user.save();

        res.status(200).json({message: "Quiz created successfully", quiz: newQuiz});
    } catch(error){
        console.log(error);
        res.status(500).json({error: error.message})
    }
}

const getAll = async(req, res) => {
    try{
        const quizzes = await Quiz.find({});
        res.status(200).json({message: 'Quizzes fetched successfully', quizzes});
    } catch(error){
        res.status(500).json({error: error.message});
    }
}

const getOne = async(req, res) => {
    try{
        const quizFetched = await Quiz.findById(req.params.id);
        if(!quizFetched) res.status(404).json("Quiz not found");
        res.status(200).json({message: 'Quiz fetched successfully', quizFetched});
    } catch(error){
        console.log("error: ", error);
        res.status(500).json({error: error.message});
    }
}

// exports.evaluate = async(req, res) => {
//     try{
//         const id = req.params.id;
//         const userEmail = req.user.email;
//         const user = await User.findOne({email});
//         if(! user) return res.status(404).json("User not found");

//     } catch(error){
//         console.log("error: ", error);
//         res.status(500).json({error: error.message});
//     }
// }

module.exports = {create, getAll, getOne};