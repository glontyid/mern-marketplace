const express = require('express');
const mongoose = require('mongoose');
const db = mongoose.connection

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({extended: true}));
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/catalog', require('./routes/catalog.route'));
app.use('/api/cart', require('./routes/cart.route'));
app.use('/api/profile', require('./routes/profile.route'));
app.use('/api/admin', require('./routes/admin.route'));

async function start() {
  try {
    await mongoose.connect('mongodb+srv://glontyid:qweasd123@cluster0.9r7rr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

    app.listen(PORT, () => {
      console.log('server started')
    })
  } catch (err) {
    console.log(err);
  }
}

start();

module.exports = db;

