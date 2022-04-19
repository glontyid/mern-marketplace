const {Router} = require('express');
const router = Router();
const User = require('../models/User');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwtToken = require('jsonwebtoken');

router.post('/registration', 
[
  check('email', 'некорректный эмейл').isEmail(),
  check('password', 'некорректный пароль').isLength({min: 6})
], 
async (req, res) => {
  try {
    const errors = validationResult(req, res);

    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array(), message: 'некорректные данные при регистрации'});
    }

    const {email, password, admin} = req.body;
    const isUsed = await User.findOne({email: email});

    if (isUsed) {
      return res.status(300).json({message: 'данный эмейл занят'});
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = new User({
      email, password: hashedPassword, fullName: 'Зебра', gender: 'male', age: 0, admin: admin
    })

    await user.save()

    res.status(201).json({message: 'пользователь создан'});
  } catch (err) {
    console.log(err);
  }
})

router.post('/login', 
[
  check('email', 'некорректный эмейл').isEmail(),
  check('password', 'некорректный пароль').exists()
], 
async (req, res) => {
  try {
    const errors = validationResult(req, res);

    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array(), message: 'некорректные данные при регистрации'});
    }

    const {email, password} = req.body;

    const user = await User.findOne({email})
    if (!user) {
      return res.status(400).json({message: 'такого email нет в базе'})
    }

    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({message: 'пароли не совпадают'})
    }

    const jwtSecret = 'djsh1kh1kdhk1hwk1hk2h12dh12jdh1khd';

    const token = jwtToken.sign(
      {
        userId: user.id,
        isAdmin: user.admin
      },
      jwtSecret,
      {expiresIn: '1h'}
    )

    res.json({token, userId: user.id, isAdmin: user.admin})
    
  } catch (err) {
    console.log(err);
  }
})

module.exports = router