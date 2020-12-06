const express = require("express");
const bodyParser = require("body-parser");
const translate = require('@vitalets/google-translate-api');
const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(express.static(__dirname + "./public/"));
app.set('trust proxy', true);
app.set('views', __dirname + '/views');
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.get('/',(req,res) => { res.render('homepage') })
app.get('/login',(req,res) => { res.render('login') })
app.post('/login',(req,res) => { res.redirect('dashboard') })
app.get('/signup',(req,res) => { res.render('signup') })
app.post('/signup',(req,res) => { res.redirect('dashboard') })
app.get('/dashboard',(req,res) => { res.render('dashboard') })
app.get('/newcase',(req,res) => { res.render('newcase') })
app.post('/newcase',(req,res) => { res.redirect('recordaudio') })
app.get('/mycases',(req,res) => { res.render('mycases') })
app.get('/archives',(req,res) => { res.render('archives') })
app.get('/viewcase',(req,res) => { res.render('viewcase') })

app.get('/recordaudio',(req,res) => {
    res.render('recordaudio',{translated:""})
})

// app.get('/speechtranslator',(req,res) => {
//   res.render('speechtranslator',{translated:""})
// })

app.post('/speechtranslator',(req,res) => {

    console.log(req.body.speech)

    translate(req.body.speech, {to: req.body.language})
    .then(response => {
        res.render('recordaudio',{translated:response.text})
    })
    .catch(err => {
        console.error(err);
    });

})

app.post('/saveData', (req, res) => {
        console.log(req.body);
        res.send("req.body");
    
})


app.listen(PORT, () => {
  console.log(`App is listening on Port ${PORT}`);
});
