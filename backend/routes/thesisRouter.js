
const router = require('express').Router()
const thesisController = require('../controller/thesisController')
const {authAdmin} = require('../middleware/auth')
const {authAdminRole} = require('../middleware/authAdminRole')

router.post('/thesis/plagiarism',thesisController.getplagiarism)
router.get('/thesis',thesisController.get)
router.get('/thesis/admin',thesisController.getAdminThesis)
router.get('/thesisCount',thesisController.thesisCount)
router.get('/thesis/:id',thesisController.find)
router.get('/thesis/student/:id',thesisController.getStudentThesis)
router.post('/thesis/new', thesisController.create)
// router.delete('/thesis/delete/:id', thesisController.delete)
router.put('/thesis/deactivate/:id',authAdmin,authAdminRole,  thesisController.deactivate)
router.put('/thesis/activate/:id',authAdmin,authAdminRole,  thesisController.activate)
router.put('/thesis/delete/:id',authAdmin,authAdminRole,  thesisController.softDelete)
router.put('/thesis/restore/:id',authAdmin,authAdminRole,  thesisController.restoreDelete)

module.exports = router