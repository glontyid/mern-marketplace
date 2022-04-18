const {Router} = require('express');
const router = Router();
const User = require('../models/User');
const Product = require('../models/Product');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

router.get('/get/:id', async (req, res) => {
  const user = await User.findOne({_id: req.params.id})

  if (!user) {
    return res.status(400).json({message: req.params})
  }

  res.status(200).json(user)
})

router.put('/change/:id/', 
[
  check('email', 'некорректный эмейл').isEmail(),
  check('password', 'некорректный пароль').isLength({min: 6})
], 
async (req, res) => {
  try {
    const user = await User.findOne({_id: req.params.id});
    const {email, password, gender, fullName, age} = req.body;
    const emailIsUsed = await User.findOne({email: email});
    
    if (emailIsUsed && user.email !== email) {
      return res.status(300).json({message: 'данный эмейл занят'});
    }

    const hashedPassword = password.length ? await bcrypt.hash(password, 12) : false

    if (hashedPassword) {
      user.password = hashedPassword;
    }

    user.email = email;
    user.gender = gender;
    user.fullName = fullName;
    user.age = age;

    await user.save();
    res.json(user);
  } catch (error) {
    console.log(error)
  }
})

router.get('/story', async (req, res) => {
  try {
    const products = await Product.find({id: {$in : req.query.cart}});
    
    res.status(200).json(products);
  } catch (err) {
    res.status(404).json({message: err.message});
  }
})

module.exports = router