const mongoose = require('mongoose');

// Define the Product schema
const productSchema = new mongoose.Schema({
  shoename: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    L: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    M: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    S: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
});

// Create the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
