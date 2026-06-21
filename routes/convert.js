const express = require('express');
const multer = require('multer');
const sharp = require('sharp');

const router = express.Router();

const upload = multer({
    dest: 'uploads/'
});

router.post('/png', upload.single('image'), async (req, res) => {

    const outputPath =
        `output/converted-${Date.now()}.png`;

    await sharp(req.file.path)
        .png()
        .toFile(outputPath);

    res.download(outputPath);

});

router.post('/jpg', upload.single('image'), async (req, res) => {

    const outputPath =
        `output/converted-${Date.now()}.jpg`;

    await sharp(req.file.path)
        .jpeg({ quality: 90 })
        .toFile(outputPath);

    res.download(outputPath);

});

module.exports = router;