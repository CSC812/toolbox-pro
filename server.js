const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/image', require('./routes/image'));
app.use('/compress', require('./routes/compress'));
app.use('/convert', require('./routes/convert'));
app.use('/imagepdf', require('./routes/imagepdf'));
app.use('/mergepdf', require('./routes/mergepdf'));
app.use('/resize-kb', require('./routes/resizekb'));

app.listen(3000, '0.0.0.0', () => {
    console.log('Server running on port 3000');
});