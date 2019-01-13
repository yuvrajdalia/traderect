const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
  // not added catname field into this yet(thinking)

  product_name: {
    type: String,
    required: true,
    unique: true
  },
  datetime: {
    type: String,
    required: true,
  }
} ,{
    timestamp: true
  }
);

const subcategorySchema = new mongoose.Schema({
    subcat_name: {
      type: String,
      required: true,
      unique: true
    },
    image: {
      type: String,
      required: true,
      unique: true
    },
    products: [productSchema]
},{
  timestamp: true
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
    subcats: [ subcategorySchema ]
  },{
      timestamp: true
    });

var Categories = mongoose.model("category",categorySchema);

module.exports = Categories;
