const router = require('express').Router()
const departmentController = require('../controller/departmentController')
const {authAdmin} = require('../middleware/auth')
const authAdminRole = require('../middleware/authAdminRole')

router.get('/department',departmentController.get)
router.get('/department/:id',departmentController.find)
router.post('/department/new', authAdmin,authAdminRole,  departmentController.create)
router.put('/department/edit/:id', authAdmin,authAdminRole,  departmentController.editDepartment)
router.delete('/department/delete/:id', authAdmin,authAdminRole, departmentController.delete)

module.exports = router