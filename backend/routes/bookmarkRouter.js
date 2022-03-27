const router = require('express').Router()
const bookmarkController = require('../controller/bookmarkController')
const {authAdmin} = require('../middleware/auth')
const authAdminRole = require('../middleware/authAdminRole')

router.post('/bookmark/new', bookmarkController.create)
router.delete('/bookmark/delete/:id', bookmarkController.delete)
router.get('/bookmark/:id',bookmarkController.find)
module.exports = router