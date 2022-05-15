const router = require('express').Router()
const subscriptionController = require('../controller/subscriptionController')
const {authAdmin} = require('../middleware/auth')
const {authAdminRole} = require('../middleware/authAdminRole')

router.get('/subscription/:id', subscriptionController.find)
router.get('/subscription',subscriptionController.findList)
router.post('/subscription/new', subscriptionController.create)
router.put('/subscription/expired/:id', subscriptionController.subExpire)
router.put('/subscription/expiredSub', subscriptionController.subExpireAdmin)
router.put('/subscription/verify/:id', subscriptionController.verifyRequest)
router.put('/subscription/decline/:id', subscriptionController.declineRequest)

module.exports = router