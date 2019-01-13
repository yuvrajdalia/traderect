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

//category routing
app.use('/categories', catRouter);
//

//main routings
app.get('/cats', (req, res) => {
  Categories.find({}, (err, cats) => {
    if(err){
      console.log(err);
    }
    else{
      res.render('category_page', {cats: cats});
    }
  })
})

app.get('/cats/:catName',function(req,res){
    var catName = req.params.catName;
    Categories.findOne({ cat_name : catName}, (err, cat) => {
      if(err){
        console.log(err);
      }

      else{
          res.render('products_page', { catObject : cat });
      }
    });
});

app.get('*', function (req, res){
  res.render('pnf');
});

app.listen(PORT, () => {
  console.log('Server is running on PORT:',PORT);
});
