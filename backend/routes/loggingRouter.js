const router = require('express').Router()
const loggingController = require('../controller/loggingController')
// const {authAdmin} = require('../middleware/auth')
// const authAdminRole = require('../middleware/authAdminRole')

// router.get('/department',departmentController.get)
// router.get('/department/:id',departmentController.find)
router.post('/view/log', loggingController.viewLog)
router.post('/search/log', loggingController.searchLog)
router.post('/download/log', loggingController.downloadLog)
router.get('/home/count', loggingController.homeCount)
router.get('/featured/count', loggingController.featuredCount)
router.get('/log/count', loggingController.logCount)
router.get('/data/count', loggingController.dataCount)
router.get('/student/count/:user', loggingController.studentDataCount)
// router.put('/department/edit/:id', authAdmin,authAdminRole,  departmentController.editDepartment)
// router.delete('/subscription/delete/:id', subscriptionController.delete)

module.exports = router