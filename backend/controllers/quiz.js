const Quiz = require("../models/quiz");
const User = require("../models/user");

const create = async(req, res) => {
    try{
        const {title, description, questions} = req.body;

        if(!title || !description || !questions){
            res.status(400).json({message: "Either title or description or questions are not provided"});
        }

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
        res.status(500).json({error: error.message})
    }
}

const getAll = async(req, res) => {
    
}

module.exports = {create};