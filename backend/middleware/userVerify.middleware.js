const jwt = require('jsonwebtoken');

const decodeToken = (req, res, next) => {
    const token = req.cookies.token;

    if(! token){
        return res.status(401).json("No token available, access denied");
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({message: "Invalid Token"});
    }
}

module.exports = decodeToken;

