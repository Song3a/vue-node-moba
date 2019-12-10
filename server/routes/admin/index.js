module.exports = app => {
  const express = require('express')
  const router = express.Router({
    mergeParams: true
  })

  // 登录校验中间件
  const authMiddleWare = require('../../middleWare/auth')
  // 保存数据
  router.post('/', authMiddleWare, async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // 更新数据
  router.put('/:id', authMiddleWare, async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // 请求列表数据
  router.get('/', authMiddleWare, async (req, res) => {
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
  router.get('/parent-options', authMiddleWare, async (req, res) => {
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
  router.get('/props-options', authMiddleWare, async (req, res) => {
    const Model = require('../../models/Category')
    const items = await Model.findOne({ name: '属性分类' }).populate('children')
    res.send(items)
  })
  // 请求编辑单个数据
  router.get('/:id', authMiddleWare, async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  // 删除数据
  router.delete('/:id', authMiddleWare, async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })
  // 通用CRUD接口中间件
  const resourceMiddleWare = require('../../middleWare/resource')
  app.use('/admin/api/rest/:resource', authMiddleWare, resourceMiddleWare, router)
  // 文件上传接口
  const multer = require('multer')
  const upload = multer({ dest: __dirname + '../../../uploads' })
  app.post('/admin/api/upload', authMiddleWare, upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })
  // 登录接口
  app.post('/admin/api/login', async (req, res) => {
    const AdminUser = require('../../models/AdminUser')
    const { name, password } = req.body
    const user = await AdminUser.findOne({ name }).select('+password')
    assert(user, 422, '用户不存在')
    const isValid = require('bcryptjs').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')
    const token = jwt.sign({ id: user._id }, app.get('secret'))
    res.send({ token })
  })
  // 错误处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}