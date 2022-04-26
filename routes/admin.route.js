const {Router} = require('express');
const router = Router();
const Product = require('../models/Product');

router.post('/add', async (req, res) => {
  try {
    const {id, title, price, oldPrice, description, category, image, rating: {rate, count}} = req.body;
    const newProduct = new Product({
      id: id, 
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

router.delete('/delete/:id', async (req, res) => {
  try {
    await Product.deleteOne({id: req.params.id});

    res.status(200).json({message: 'товар добавлен'})
  } catch (err) {
    res.status(404).json({message: err.message});
  }
})

router.put('/change/:id', async (req, res) => {
  try {
    const product = await Product.findOne({id: req.params.id});
    const {title, price, oldPrice, description, category, image} = req.body;

    product.title = title;
    product.price = price;
    product.oldPrice = oldPrice;
    product.description = description;
    product.category = category;
    product.image = image;

    await product.save();

    res.status(200).json({message: 'товар изменён'})
  } catch (err) {
    res.status(404).json({message: err.message});
  }
})

module.exports = router