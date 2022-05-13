const router = require('express').Router()
const guestController = require('../controller/guestController')
const {authGuest, authAdmin, authGuestMobile} = require('../middleware/auth')
const {authAdminRole} = require('../middleware/authAdminRole')

router.post('/register', guestController.register)

router.post('/activation', guestController.activateEmail)

router.post('/login', guestController.login)

router.get('/logout', guestController.logout)

router.post('/access', guestController.getAccessToken)

router.post('/forgot', guestController.forgotPassword)

router.post('/reset', authGuest, guestController.resetPassword)

router.get('/infor', authGuest, guestController.getGuestInfor)

router.get('/all_infor',authAdmin,authAdminRole, guestController.getGuestsAllInfor)

router.get('/inforAdmin/:id',authAdmin,authAdminRole, guestController.getGuestInforAdmin)

router.put('/deactivate/:id',authAdmin,authAdminRole, guestController.deactivate)

router.put('/edit/:id', guestController.updateProfile)

router.delete('/delete/:id',authAdmin,authAdminRole,  guestController.delete)

router.get('/informobile', authGuestMobile, guestController.getGuestInfor)
// router.put('/edit/:id',authAdmin,authAdminRole, guestController.updateAdmin)


// router.get('/logout', guestController.logout)

// router.patch('/update', auth, guestController.updateGuest)

// router.patch('/update_role/:id', auth, authAdmin, guestController.updateGuestsRole)

// router.delete('/delete/:id', auth, authAdmin, guestController.deleteGuest)


// // Social Login
// router.post('/google_login', guestCtrl.googleLogin)

// router.post('/facebook_login', guestCtrl.facebookLogin)


module.exports = router