const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  icon: { type: String },
  tag: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },
  hp: { type: Number },
  ad: { type: Number },
  ap: { type: Number },
  rom: { type: Number },
  rst: { type: Number },
  adp: { type: Number },
  app: { type: Number },
  crit: { type: Number },
  effect: { type: Number },
  describe: { type: String }
})

module.exports = mongoose.model('Item', schema)