const {Router} = require('express');
const router = Router();
const Product = require('../models/Product');

router.post('/add', async (req, res) => {
  try {
    const {id, title, price, oldPrice, description, category, image, rating: {rate, count}} = req.body;
    const newProduct = new Product({
      id: +id, 
      title: title, 
      price: +price, 
      oldPrice: +oldPrice, 
      description: description, 
      category: category, 
      image: image,
      rating: {
        rate: rate,
        count: count,
      }
    });

    await newProduct.save();

    res.status(201).json({message: 'товар создан'});
  } catch (err) {
    res.status(404).json({message: err.message});
  }
})

module.exports = router