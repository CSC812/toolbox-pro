const express = require('express');
const multer = require('multer');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

const router = express.Router();

const upload = multer({
    dest: 'uploads/'
});

router.post('/',
upload.array('pdfs', 20),
async (req,res)=>{

try{

const mergedPdf =
await PDFDocument.create();

for(const file of req.files){

const pdfBytes =
fs.readFileSync(file.path);

const pdf =
await PDFDocument.load(pdfBytes);

const pages =
await mergedPdf.copyPages(
pdf,
pdf.getPageIndices()
);

pages.forEach(page=>{
mergedPdf.addPage(page);
});

}

const mergedBytes =
await mergedPdf.save();

const output =
`output/merged-${Date.now()}.pdf`;

fs.writeFileSync(
output,
mergedBytes
);

res.download(output);

}catch(err){

console.error(err);

res.status(500)
.send('Merge failed');

}

});

module.exports = router;