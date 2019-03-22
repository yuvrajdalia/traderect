const  express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Categories = require('../models/categories');

const catRouter = express.Router();

catRouter.use(bodyParser.json());

catRouter.route('/')
.get((req,res,next) => {

  let promise = Categories.find({})
      .then((cats) => {
          res.statusCode = 200;
          //res.setHeader('Content-Type', 'text/html; charset=utf-8');
          //res.json(cat);
          //res.set('Content-Type', 'text/html');
          res.render('category_page.ejs',{cats:cats});
      }, (err) => next(err))
      .catch((err) => next(err));
})
.post((req,res,next) => {
  
  Categories.create(req.body)
  .then((cat) => {
    console.log('Category Created ', cat);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(cat);
  }, (err) => next(err))
    .catch((err) => next(err));
})

.put((req,res,next) => {
  res.end('PUT operation not supported !');
})
.delete((req,res,next) => {

  Categories.remove({})
  .then((resp) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(resp);
  }, (err) => next(err))
    .catch((err) => next(err));
});

//categories with id routing
catRouter.route('/:catId')

.get((req,res,next) => {

  Categories.findById(req.params.catId)
  .then((cats) => {
    res.statusCode = 200;
    //res.setHeader('Content-Type', 'application/json');
    //res.json(cat);
      res.set('Content-Type', 'text/html');
    res.render('products_page.ejs',{cats:cats});
  }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next) => {
  res.end('POST operation not supported here! ');
})
.put((req,res,next) => {

  Categories.findByIdAndUpdate(req.params.catId, {
    $set: req.body
  }, { new: true })
  .then((cat) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(cat);
  }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req,res,next) => {

    Categories.findByIdAndRemove(req.params.catId)
  .then((resp) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(resp);
  }, (err) => next(err))
    .catch((err) => next(err));
});


//adding routes for products and products/:productId endpoints
catRouter.route('/:catId/products')
.get((req,res,next) => {
    Categories.findById(req.params.catId)
    .then((cat) => {
        if (cat != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(cat.products);
        }
        else {
            err = new Error('Cat ' + req.params.catId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Categories.findById(req.params.catId)
    .then((cat) => {
        if (cat != null) {
            cat.products.push(req.body);
            cat.save()
            .then((cat) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(cat);
            }, (err) => next(err));
        }
        else {
            err = new Error('Cat ' + req.params.catId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /cat/'
        + req.params.catId + '/products');
})
.delete((req, res, next) => {
    Categories.findById(req.params.catId)
    .then((cat) => {
        if (cat != null) {
            for (var i = (cat.products.length -1); i >= 0; i--) {
                cat.products.id(cat.products[i]._id).remove();
            }
            cat.save()
            .then((cat) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(cat);
            }, (err) => next(err));
        }
        else {
            err = new Error('Cat ' + req.params.catId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

catRouter.route('/:catId/products/:productId')
.get((req,res,next) => {
    Categories.findById(req.params.catId)
    .then((cat) => {
        if (cat != null && cat.products.id(req.params.productId) != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(cat.products.id(req.params.productId));
        }
        else if (cat == null) {
            err = new Error('Cat ' + req.params.catId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Product ' + req.params.productId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /cats/'+ req.params.catId
        + '/products/' + req.params.productId);
})
.put((req, res, next) => {
    Categories.findById(req.params.catId)
    .then((cat) => {
        if (cat != null && cat.products.id(req.params.productId) != null) {
            if (req.body.product_name) {
                cat.products.id(req.params.productId).productId = req.body.product_name;
            }
            if (req.body.image) {
                cat.products.id(req.params.productId).image = req.body.image;
            }
            cat.save()
            .then((cat) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(cat);
            }, (err) => next(err));
        }
        else if (cat == null) {
            err = new Error('Cat ' + req.params.catId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Product ' + req.params.productId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Categories.findById(req.params.catId)
    .then((cat) => {
        if (cat != null && cat.products.id(req.params.productId) != null) {
            cat.products.id(req.params.productId).remove();
            cat.save()
            .then((cat) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(cat);
            }, (err) => next(err));
        }
        else if (cat == null) {
            err = new Error('Cat ' + req.params.catId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Product ' + req.params.productId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports = catRouter;
