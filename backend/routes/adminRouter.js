const router = require('express').Router()
const adminController = require('../controller/adminController')
const {authAdmin} = require('../middleware/auth')
const authAdminRole = require('../middleware/authAdminRole')

router.post('/register', adminController.register)

router.post('/activation', adminController.activateEmail)

router.post('/login', adminController.login)

router.get('/logout', adminController.logout)

router.post('/access', adminController.getAccessToken)

router.post('/forgot', adminController.forgotPassword)

router.post('/reset', authAdmin, adminController.resetPassword)

router.get('/infor', authAdmin, adminController.getAdminInfor)

router.get('/all_infor', authAdmin, authAdminRole, adminController.getAdminsAllInfor)

router.get('/inforAdmin/:id',authAdmin,authAdminRole, adminController.getAdminInforAdmin)

router.put('/deactivate/:id',authAdmin,authAdminRole, adminController.deactivate)

router.put('/edit/:id',authAdmin,authAdminRole, adminController.updateAdmin)

router.delete('/delete/:id',authAdmin,authAdminRole,  adminController.delete)

// router.get('/logout', adminController.logout)

// router.patch('/update', auth, adminController.updateAdmin)

// router.patch('/update_role/:id', auth, authAdmin, adminController.updateAdminsRole)

// router.delete('/delete/:id', auth, authAdmin, adminController.deleteAdmin)


// // Social Login
// router.post('/google_login', adminCtrl.googleLogin)

// router.post('/facebook_login', adminCtrl.facebookLogin)


module.exports = router