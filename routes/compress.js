const express = require('express');
const multer = require('multer');
const sharp = require('sharp');

const router = express.Router();

const upload = multer({
    dest: 'uploads/'
});

router.post('/', upload.single('image'), async (req, res) => {

    try {

        const outputPath =
            `output/compressed-${Date.now()}.jpg`;

        await sharp(req.file.path)
            .jpeg({
                quality: 50
            })
            .toFile(outputPath);

        res.download(outputPath);

    } catch (err) {
        console.error(err);
        res.status(500).send('Compression Failed');
    }

});

module.exports = router;