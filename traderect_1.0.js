var express = require('express');
var mongoose=require("mongoose");

const Categories = require('./models/categories');
const dburl ='mongodb://localhost:27017/dbTraderect';
const PORT = process.env.PORT || 3000;

mongoose.connect(dburl,{useNewUrlParser:true}).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

var app = express();

app.set('view engine', 'ejs');
app.use('/', express.static('assests')); //middleware for handling .css file request


app.get('/', function(req, res){
  Categories.find({},function(err,cats){
    if(err){console.log(err);}
  res.render('home',{cats:cats});
    });
});

app.get('/contact', function(req, res){
  res.render('contact_us');
});

app.get('/categories/:category',function(req,res){
    var category = req.params.category;
    var myCursor = Categories.find({cat_name: category}, (err, result) => {
      if(err){
        console.log(err);
      }
      else if(result == 'NULL' || result == ''){
        res.render('pnf');
      }
      else{
        Categories.find({cat_name: "cat_name"}, (err, result) => {
          var subcats = result.subcats;
        });
        res.render('category_page',{ cat_name: cat_name, subcats: subcats  });
      }
    });
});
//render subcat page
//app.get('/categoies/') dont know how to set route about the url "/categories/subcategory/"

app.get('*', function (req, res){
  res.render('pnf');
});

app.listen(PORT, () => {
  console.log('Server is running on PORT:',PORT);
});
