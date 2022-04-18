const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  owner: {type: Types.ObjectId, ref: 'User'},
  cart: {type: []}
})

module.exports = model('Cart', schema);