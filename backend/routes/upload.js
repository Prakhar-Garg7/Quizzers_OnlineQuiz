const express = require("express")
const upload = require("../config/multerConfig")
const {uploadImage} = require("../controllers/upload")

const router = express.Router();

router.post("/upload", upload.single("image"), uploadImage)

module.exports = router