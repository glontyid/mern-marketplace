const {Router} = require('express');
const router = Router();
const Product = require('../models/Product');

router.get('/get', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(404).json({message: err.message});
  }
})

router.post('/catalog', (req, res) => {
  try {
    res.send('product created')
  } catch (err) {
    console.log(err)
  }
})

module.exports = router;