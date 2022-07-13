let express = require('express');
let app = express();

let bodyParser = require('body-parser');

app.use(function loggerMW(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.use('/public', express.static(__dirname + '/public'));


app.get('/json', (req, res) => {
  let json_text = "Hello json"
  let json_message = { "message": (process.env['MESSAGE_STYLE'] === "uppercase" ? json_text.toUpperCase() : json_text) };
  // console.log(json_message);
  res.json(json_message);
});

app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({ time: req.time });
})

//app.route('/:word/echo')
//  .get( (req, res) => {
//    let echo_word = req.params.words;
//    console.log(`echo word: ${echo_word}`)
//    res.json({ echo: echo_word })
//  });

app.get('/name', (req, res) => {
    let myName = `${req.query.first} ${req.query.last}`;
    console.log(`name: ${myName}`)
    res.json({ name: myName });
});

  
app.post('/name', (req, res) => {
  let myName = `${req.body.first} ${req.body.last}`;
    console.log(`name: ${myName}`);
    res.json({name: myName});
  }
);

console.log('Hello World');

































 module.exports = app;
