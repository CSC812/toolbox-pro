const express = require('express');
const multer = require('multer');
const sharp = require('sharp');

const router = express.Router();

const upload = multer({
dest:'uploads/'
});

router.post('/',
upload.single('image'),
async(req,res)=>{

const targetKB =
parseInt(req.body.targetKB);

let quality = 90;

let buffer;

while(quality > 10){

buffer = await sharp(req.file.path)
.jpeg({ quality })
.toBuffer();

if(buffer.length <= targetKB * 1024){
break;
}

quality -= 5;

}

res.setHeader(
'Content-Type',
'image/jpeg'
);

res.send(buffer);

});

module.exports = router;