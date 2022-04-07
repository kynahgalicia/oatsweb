const router = require('express').Router()
const subscriptionController = require('../controller/subscriptionController')
const {authAdmin} = require('../middleware/auth')
const authAdminRole = require('../middleware/authAdminRole')

// router.get('/department',departmentController.get)
// router.get('/department/:id',departmentController.find)
router.post('/subscription/new', subscriptionController.create)
// router.put('/department/edit/:id', authAdmin,authAdminRole,  departmentController.editDepartment)
// router.delete('/department/delete/:id', authAdmin,authAdminRole, departmentController.delete)

module.exports = router