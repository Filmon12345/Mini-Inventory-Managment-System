require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.URI);
const productSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  image:{
    type:String,
    required:true
  },
  category:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  price:{
    type:String,
    required:true
  },
  amount:{
    type:String,
    required:true
  }
});

const Product = new mongoose.model('Product', productSchema);
module.exports = Product;