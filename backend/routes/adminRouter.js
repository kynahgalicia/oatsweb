const router = require('express').Router()
const adminController = require('../controller/adminController')
const {authAdmin} = require('../middleware/auth')
const {authAdminRole, authSuperAdminRole} = require('../middleware/authAdminRole')

router.post('/register',authAdmin,authSuperAdminRole, adminController.register)

router.post('/activation', adminController.activateEmail)

router.post('/login', adminController.login)

router.get('/logout', adminController.logout)

router.post('/access', adminController.getAccessToken)

router.post('/forgot', adminController.forgotPassword)

router.post('/reset', authAdmin, adminController.resetPassword)

router.get('/infor', authAdmin, adminController.getAdminInfor)

router.get('/all_infor', authAdmin, authAdminRole, adminController.getAdminsAllInfor)

router.get('/inforAdmin/:id',authAdmin,authAdminRole, adminController.getAdminInforAdmin)

router.put('/deactivate/:id',authAdmin,authSuperAdminRole, adminController.deactivate)

router.put('/activate/:id',authAdmin,authSuperAdminRole, adminController.activate)

router.put('/delete/:id',authAdmin,authSuperAdminRole, adminController.softDelete)

router.put('/restore/:id',authAdmin,authSuperAdminRole, adminController.restoreDelete)

router.put('/edit/:id' ,authAdmin,authAdminRole, adminController.updateAdmin)

router.put('/super/:id',authAdmin,authSuperAdminRole,adminController.superAdmin)

router.put('/moderator/:id' ,authAdmin,authAdminRole, adminController.moderatorAdmin)

// router.delete('/delete/:id',authAdmin,authAdminRole,  adminController.delete)

// router.get('/logout', adminController.logout)

// router.patch('/update', auth, adminController.updateAdmin)

// router.patch('/update_role/:id', auth, authAdmin, adminController.updateAdminsRole)

// router.delete('/delete/:id', auth, authAdmin, adminController.deleteAdmin)


// // Social Login
// router.post('/google_login', adminCtrl.googleLogin)

// router.post('/facebook_login', adminCtrl.facebookLogin)


module.exports = router