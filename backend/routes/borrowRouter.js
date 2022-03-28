const router = require('express').Router()
const borrowController = require('../controller/borrowController')

router.get('/borrow',borrowController.get)
router.post('/borrow/new',borrowController.create)
router.put('/borrow/edit/:id',borrowController.edit)
router.delete('/borrow/delete/:id', borrowController.delete)

module.exports = router