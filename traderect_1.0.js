var express = require('express');
var mongoose=require("mongoose");
var fs = require('fs');
var multer = require('multer');

const Categories = require('./models/categories');
const Products=require('./models/categories');
const dburl ='mongodb://localhost:27017/dbTraderect';
const PORT = process.env.PORT || 3000;

mongoose.connect(dburl,{useNewUrlParser:true}).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

var app = express();

app.set('view engine', 'ejs');
app.use('/', express.static('assests')); //middleware for handling .css file request

var catRouter = require('./routes/category');

//home routing
app.get('/', function(req, res){
  Categories.find({},function(err,cats){
    if(err){console.log(err);}
  res.render('home',{cats : cats});
    });
});


app.get('/contact', function(req, res){
  res.render('contact_us');
});

app.get('/submit_page/', function(req, res){
  res.render('submit_page');
});

//category routing
app.use('/categories', catRouter);
//

//main routings



app.get('*', function (req, res){
  res.render('pnf');
});

var upload = multer({ dest: './uploads/',
rename: function (fieldname, filename) {
  return filename;
},
});

app.listen(PORT, () => {
  console.log('Server is running on PORT:',PORT);
});
