const express = require('express');
const multer = require('multer');
const sharp = require('sharp');

const router = express.Router();

const upload = multer({
    dest: 'uploads/'
});

router.post('/resize', upload.single('image'), async (req, res) => {

    try {

        const width = parseInt(req.body.width);
        const height = parseInt(req.body.height);

        const outputPath =
            `output/resized-${Date.now()}.jpg`;

        await sharp(req.file.path)
            .resize(width, height)
            .jpeg({ quality: 90 })
            .toFile(outputPath);

        res.download(outputPath);

    } catch (err) {
        console.error(err);
        res.status(500).send('Resize failed');
    }
});

module.exports = router;