const mongoose = require('mongoose')

const schema = mongoose.Schema({
  name: { type: String },
  avater: { type: String },
  tags: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  skills: [{
    name: { type: String },
    icon: { type: String },
    cd: { type: String },
    cost: { type: String },
    describe: { type: String }
  }]
})

module.exports = mongoose.model('Hero', schema)