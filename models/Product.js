const { Schema, model, Types } = require('mongoose');

const productSchema = new Schema({
  id: String,
  title: String,
  price: Number,
  oldPrice: Number,
  description: String,
  category: String,
  image: String,
  rating: {
    rate: Number,
    count: Number,
  }
})

module.exports = model('Product', productSchema);