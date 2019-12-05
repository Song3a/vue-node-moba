const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  icon: { type: String },
  tag: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },
  addition: {
    // 基础属性
    HP: { type: Number },
    MP: { type: Number },
    ATK: { type: Number },
    MAG: { type: Number },
    ROM: { type: Number },
    RST: { type: Number },
    // 攻击属性
    MOV: { type: Number },
    ADP: { type: Number },
    APP: { type: Number },
    rate: { type: Number },
    Crit: { type: Number },
    CritEffect: { type: Number },
    PBS: { type: Number },
    SBS: { type: Number },
    CD: { type: Number },
    // 防御属性
    tenacity: { type: Number },
    HPrecover: { type: Number },
    MPrecover: { type: Number }
  },
  describe: { type: String },
  // 暂定字段，以后用于计算伤害
  expression: { type: String }
})

module.exports = mongoose.model('Item', schema)