const mongoose = require('mongoose')

const schema = mongoose.Schema({
  name: { type: String },
  avater: { type: String },
  tags: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  scores: {
    difficult: { type: Number },
    skill: { type: Number },
    attack: { type: Number },
    survive: { type: Number }
  },
  skills: [{
    name: { type: String },
    icon: { type: String },
    cd: { type: String },
    cost: { type: String },
    describe: { type: String }
  }],
  props: {
    maxHp: { type: Number },
    hpLv: { type: Number },
    ad: { type: Number },
    adLv: { type: Number },
    ap: { type: Number, default: 0 },
    rom: { type: Number },
    romLv: { type: Number },
    rst: { type: Number },
    rstLv: { type: Number },
    adp: { type: Number, default: 0 },
    app: { type: Number, default: 0 },
    crit: { type: Number, default: 0 },
    effect: { type: Number, default: 200 }
  }
})

module.exports = mongoose.model('Hero', schema)