const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
  
  product_name: {
    type: String
  },
  image: {
    type: String
  },
  datetime: {
    type: String
  }
});

const categorySchema = new mongoose.Schema({
    cat_name: {
      type: String,
      required: true,
      unique: true
    },
    image: {
      type: String,
      required: true,
      unique: true

    },
    products : [ productSchema ]
  });

var Categories = mongoose.model("category",categorySchema);

module.exports = Categories;
