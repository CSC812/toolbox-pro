const express = require('express');
const multer = require('multer');
const { PDFDocument } = require('pdf-lib');

const router = express.Router();

const upload = multer({
  dest: 'uploads/'
});

router.post('/',
  upload.single('pdf'),
  async (req, res) => {

    const pageNumber =
      parseInt(req.body.page);

    const pdfBytes =
      require('fs').readFileSync(req.file.path);

    const pdfDoc =
      await PDFDocument.load(pdfBytes);

    const totalPages =
      pdfDoc.getPageCount();

    if (
      pageNumber < 1 ||
      pageNumber > totalPages
    ) {
      return res
        .status(400)
        .send('Invalid page number');
    }

    const newPdf =
      await PDFDocument.create();

    const [copiedPage] =
      await newPdf.copyPages(
        pdfDoc,
        [pageNumber - 1]
      );

    newPdf.addPage(copiedPage);

    const newBytes =
      await newPdf.save();

    res.setHeader(
      'Content-Type',
      'application/pdf'
    );

    res.send(Buffer.from(newBytes));
  }
);

module.exports = router;