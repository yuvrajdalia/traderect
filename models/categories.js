const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema=new mongoose.Schema({
    img:{
        data:Buffer , contentType:String
    },
    product_name:{
        type:String
    },
    product_description:{
        type:String
    },
    product_cat:{
        type:String
    }

});
var Products =mongoose.model("product",productSchema);
module.exports=Products;

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
