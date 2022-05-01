const router = require('express').Router()
const borrowController = require('../controller/borrowController')

router.get('/borrow',borrowController.get)
router.post('/borrow/new',borrowController.create)
router.post('/borrow/request',borrowController.studentRequest)
router.get('/borrow/request/all',borrowController.getStudent)
router.put('/borrow/return',borrowController.returnBorrow)
router.delete('/borrow/delete/:id', borrowController.delete)
router.put('/borrow/verify', borrowController.verifyRequest)
router.put('/borrow/decline/:id', borrowController.declineRequest)

module.exports = router