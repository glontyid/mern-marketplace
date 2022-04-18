const {Router} = require('express');
const router = Router();
const Cart = require('../models/Cart');
const User = require('../models/User');

router.put('/order/:id', async (req, res) => {
  try {
    const user = await User.findOne({_id: req.params.id});
    user.cart = [...user.cart, ...req.body.ids];

    await user.save();
    res.json(user);
  } catch (error) {
    console.log(error)
  }
})

module.exports = router