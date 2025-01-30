const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const OTP = require('../models/otp');
const crypto = require('crypto');
const Token = require('../models/token');

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, {
            expiresIn: '5d',
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 3600000 * 24 * 5,
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({error: "User not found"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password); 

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
            expiresIn: '5d',
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 3600000 * 24 * 5,
        });

        res.status(201).json({ message: 'User login successfully' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: error.message });
    }
}

const sendVerificationEmail = async (req, res) => {
    try {
        const userEmail = req.user.email;

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const token = crypto.randomBytes(26).toString('hex').slice(0, 35);

        const newTokenRecord = new Token({
            token,
            email: req.user.email
        });

        await newTokenRecord.save();

        const verificationUrl = `http://localhost:4003/auth/setVerify/:${token}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: 'Verify Your Email Address',
            html: `<p>Please click the link below to verify your email address:</p>
             <a href="${verificationUrl}">${verificationUrl}</a>`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

const verifyEmail = async (req, res) => {
    try {
        const token = req.params.token;
        const record = await Token.findOne({ token });
        if (!record) {
            res.status(401).json("Invalid token sent");
        }
        const user = await User.findOne({ email: record.email });
        if (!user) return res.status(400).json("User not found");
        user.isVerified = true;
        await Token.deleteOne({ token });

        res.status(200).json({ message: "User verified successfully" });
    } catch (error) {
        console.error('Verification error:', error);
        res.status(500).json({ message: error.message });
    }
};

const sendForgotPasswordEmail = async (req, res) => {
    try {
        const userEmail = req.body.email;

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const randomNumber = Math.floor(100000 + Math.random() * 900000);

        const newOTP = new OTP({ otp: randomNumber, email: userEmail });
        await newOTP.save();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: 'OTP for forgot password',
            html: `<p>Please enter the OTP ${randomNumber}</p>`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            message: "OTP sent successfully"
        })
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({ error: error.message });
    }
};

const verifyForgotPasswordOTP = async (req, res) => {
    try {
        const otp = req.params.otp;
        const record = await OTP.findOne({ otp });
        if (!record) {
            res.status(401).json("Invalid otp sent");
        }
        await OTP.deleteOne({ otp });
        res.status(200).json("Correct OTP. Please forward for new passowrd");
    } catch (error) {
        console.error('Verification error:', error);
        res.status(500).json({ message: error.message });
    }
};

const setNewPassword = async (req, res) => {
    try {
        const { email } = req.body;
        console.log("email: ", email);
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({error: "User not found"});
        }
        const isPasswordValid = await bcrypt.compare(req.body.oldPassword, user.password); 

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Incorrect password" });
        }
        user.password = await bcrypt.hash(req.body.newPassword, 10);
        await user.save();

        res.status(200).json({message: "new password set successfully"});
    } catch(error){
        console.log("error: ", error);
        res.status(500).json({error: error.message})
    }
}

module.exports = { register, sendVerificationEmail, verifyEmail, login, sendForgotPasswordEmail, verifyForgotPasswordOTP, setNewPassword };