
const router = require('express').Router()
const thesisController = require('../controller/thesisController')


router.get('/thesis',thesisController.get)
router.get('/thesis/admin',thesisController.getAdminThesis)
router.get('/thesisCount',thesisController.thesisCount)
router.get('/thesis/:id',thesisController.find)
router.get('/thesis/student/:id',thesisController.getStudentThesis)
router.post('/thesis/new', thesisController.create)
router.delete('/thesis/delete/:id', thesisController.delete)
router.put('/thesis/deactivate/:id', thesisController.deactivate)
router.put('/thesis/activate/:id', thesisController.activate)

module.exports = router