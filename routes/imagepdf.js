const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

const router = express.Router();

const upload = multer({
    dest: 'uploads/'
});

router.post('/', upload.single('image'), async (req, res) => {

    try {

        const pdfDoc = await PDFDocument.create();

        const imageBytes =
            fs.readFileSync(req.file.path);

        let image;

        if (
            req.file.mimetype === 'image/png'
        ) {
            image =
                await pdfDoc.embedPng(imageBytes);
        } else {
            image =
                await pdfDoc.embedJpg(imageBytes);
        }

        const page =
            pdfDoc.addPage([
                image.width,
                image.height
            ]);

        page.drawImage(image, {
            x: 0,
            y: 0,
            width: image.width,
            height: image.height
        });

        const pdfBytes =
            await pdfDoc.save();

        const output =
            `output/image-${Date.now()}.pdf`;

        fs.writeFileSync(output, pdfBytes);

        res.download(output);

    } catch (err) {

        console.error(err);

        res.status(500)
            .send('PDF creation failed');
    }
});

module.exports = router;