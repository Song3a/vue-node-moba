module.exports = app => {
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://localhost:27017/vue-node-moba',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )

  mongoose.connection.on('open', () => {
    console.log("MongoDB数据库连接成功...")
  })
}