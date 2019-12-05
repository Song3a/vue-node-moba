module.exports = app => {
  const express = require('express')
  const router = express.Router({
    mergeParams: true
  })

  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // 请求列表数据
  router.get('/', async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    else if (req.Model.modelName === 'Item') {
      queryOptions.populate = 'tag'
    }
    //个别情况
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(items)
  })
  // 请求分类标签选项
  router.get('/parent-options', async (req, res) => {
    let items = {}
    const Model = require('../../models/Category')
    if (req.Model.modelName === 'Category') {
      items = await Model.find({ 'parent': { $exists: false } })
      res.send(items)
    }
    else if (req.Model.modelName === 'Item') {
      items = await Model.find({ 'parent': { $exists: true } })
        .populate({ path: 'parent', match: { name: 'item' } })
      res.send(items)
    }
  })
  router.get('/props-options', async (req, res) => {
    const Model = require('../../models/Category')
    const items = Model.find({ 'parent': { $exists: true } })
      .populate({ path: 'parent', match: { name: 'props' } })
    res.send(JSON.stringify(items))
  })
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })
  //通用CRUD接口
  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require('../../models/' + modelName)
    next()
  }, router)
}