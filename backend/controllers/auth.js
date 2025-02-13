const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const Token = require('../models/token');

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

const register = async (req, res) => {
    try {
        const { name, role, email, password } = req.body;

        if (!name || !role || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            role,
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

        res.status(201).json({ message: 'User registered successfully', name, role });
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
            return res.status(404).json({ error: "User not found" });
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

        res.status(200).json({ message: 'User login successfully', role: user.role });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: error.message });
    }
}

const logout = (req, res) => {
    res.clearCookie("token"); 
    res.status(200).json({ message: "Logged out successfully" });
};



const sendEmail = async (req, res) => {
    try {
        const userEmail = req.body.email;
        const subject = req.body.subject;

        const record = await Token.findOne({email: userEmail});
        if(record) await Token.deleteOne({_id: record._id});

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        if (subject === "EmailVerification") {
            const token = crypto.randomBytes(26).toString('hex').slice(0, 35);

            const newTokenRecord = new Token({
                token,
                email: userEmail,
                sub: subject,
            });

            await newTokenRecord.save();

            const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}/${userEmail}`;

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: userEmail,
                subject: 'Verify Your Email Address',
                html: `<p>Please click the link below to verify your email address:</p>
             <a href="${verificationUrl}">${verificationUrl}</a>`,
            };

            await transporter.sendMail(mailOptions);
        } else {
            const randomNumber = Math.floor(100000 + Math.random() * 900000);

            const newRecord = new Token({ token: randomNumber, email: userEmail, sub: subject });
            await newRecord.save();

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: userEmail,
                subject: 'OTP for forgot password',
                html: `<p>Please enter the OTP ${randomNumber}</p>`,
            };

            await transporter.sendMail(mailOptions);
        }

        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

const verify = async (req, res) => {
    try {
        const { email, token } = req.body;
        const record = await Token.findOne({ email });
        if (!record) {
            return res.status(401).json("Incorrect email sent");
        }

        const user = await User.findOne({ email });
        if (!user) return res.json({ error: "user not found" });

        if (record.sub === "EmailVerification") {
            if (record.token !== token) {
                await User.deleteOne({ _id: user._id });
                await Token.deleteOne({ _id: record._id });
                return res.status(401).json("Incorrect token sent");
            }
            user.isVerified = true;
            await user.save();
            await Token.deleteOne({ _id: record._id });

            return res.status(200).json({ message: 'user verified successfully' });
        }
        if (record.token !== token) {
            await User.deleteOne({ _id: user._id });
            await Token.deleteOne({ _id: record._id });
            return res.status(401).json("Incorrect otp sent");
        }
        await Token.deleteOne({ _id: record._id });

        return res.status(200).json({ message: 'otp verified successfully' });
    } catch (error) {
        console.error('Verification error:', error);
        res.status(500).json({ message: error.message });
    }
};

const setNewPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        user.password = await bcrypt.hash(req.body.newPassword, 10);
        await user.save();

        res.status(200).json({ message: "new password set successfully" });
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = { register, sendEmail, verify, login, setNewPassword, logout };