module.exports = app => {
  const express = require('express')
  const router = express.Router({
    mergeParams: true
  })
  // 保存数据
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // 更新数据
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // 请求列表数据
  router.get('/', async (req, res) => {
    const queryOptions = {}
    let findOptions = {}
    if (req.Model.modelName === 'Category') {
      findOptions = { 'parent': { $exists: false } }
      queryOptions.populate = 'children'
    }
    else if (req.Model.modelName === 'Item') {
      queryOptions.populate = 'tag'
    }
    else if (req.Model.modelName === 'Article') {
      queryOptions.populate = 'category'
    }
    else if (req.Model.modelName === 'Hero') {
      queryOptions.populate = 'tags'
    }
    const items = await req.Model.find(findOptions).setOptions(queryOptions).limit(99)
    res.send(items)
  })
  // 请求分类选项
  router.get('/parent-options', async (req, res) => {
    let items = {}
    const Model = require('../../models/Category')
    if (req.Model.modelName === 'Category') {
      items = await Model.find({ 'parent': { $exists: false } })
      res.send(items)
    }
    else if (req.Model.modelName === 'Item') {
      items = await Model.findOne({ name: '装备分类' }).populate('children')
      res.send(items)
    }
    else if (req.Model.modelName === 'Article') {
      items = await Model.findOne({ name: '文章分类' }).populate('children')
      res.send(items)
    }
    else if (req.Model.modelName === 'Hero') {
      items = await Model.findOne({ name: '英雄定位' }).populate('children')
      res.send(items)
    }
  })
  router.get('/props-options', async (req, res) => {
    const Model = require('../../models/Category')
    const items = await Model.findOne({ name: '属性分类' }).populate('children')
    res.send(items)
  })
  // 请求编辑单个数据
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  // 删除数据
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })
  // 中间件，通用CRUD接口
  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require('../../models/' + modelName)
    next()
  }, router)
  // 中间件，文件上传接口
  const multer = require('multer')
  const upload = multer({ dest: __dirname + '../../../uploads' })
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })
}