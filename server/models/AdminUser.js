const mongoose = require('mongoose')

const schame = mongoose.Schema({
  name: { type: String },
  password: { type: String }
})

module.exports = mongoose.model('AdminUser', schame)