var express = require('express');
var cors = require('cors');
var multer = require('multer')
const bodyParser= require('body-parser')
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({extended: true}))

var upload = multer({dest: 'uploads/'})

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {

  const file = req.file

  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  })
})

app.use('*', (req, res) => {
  res.send('not found')
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
