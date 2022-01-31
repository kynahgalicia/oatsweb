const router = require('express').Router()
const departmentController = require('../controller/departmentController')


router.get('/department',departmentController.get)
router.get('/department/:id',departmentController.find)
router.post('/department/new', departmentController.create)
router.delete('/department/delete/:id', departmentController.delete)

module.exports = router