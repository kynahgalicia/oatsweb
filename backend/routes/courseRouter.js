const router = require('express').Router()
const courseController = require('../controller/courseController')
const {authAdmin} = require('../middleware/auth')
const {authAdminRole} = require('../middleware/authAdminRole')

router.get('/course',courseController.get)
router.get('/admin/course',courseController.getAdminCourse)
router.get('/course/:id',courseController.find)
router.post('/course/new',authAdmin,authAdminRole,  courseController.create)
router.put('/course/edit/:id', authAdmin,authAdminRole, courseController.editCourse)
router.put('/course/delete/:id',authAdmin,authAdminRole,  courseController.softDelete)
router.put('/course/restore/:id',authAdmin,authAdminRole,  courseController.restoreDelete)

module.exports = router