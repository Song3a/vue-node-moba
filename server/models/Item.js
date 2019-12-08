const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  icon: { type: String },
  tag: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },
  addition: [{
    prop: { type: String },
    value: { type: Number }
  }],
  describe: { type: String }
})

module.exports = mongoose.model('Item', schema)