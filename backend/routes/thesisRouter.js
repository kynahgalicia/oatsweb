
const router = require('express').Router()
const thesisController = require('../controller/thesisController')


router.get('/thesis',thesisController.get)
router.get('/thesisCount',thesisController.thesisCount)
router.get('/thesis/:id',thesisController.find)
router.post('/thesis/new', thesisController.create)
router.delete('/api/thesis/delete/:id', thesisController.delete)

module.exports = router