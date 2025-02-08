const fs = require("fs")
const cloudinary = require("../config/cloudinaryConfig")

const uploadImage = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No file uploaded !" })

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "quiz_images"
        })

        fs.unlinkSync(req.file.path)

        res.status(200).json({ imageUrl: result.secure_url })
    } catch(error){
        console.log("Upload error: ", error);
        res.status(500).json({error: error.message})
    }
}

module.exports = {uploadImage}