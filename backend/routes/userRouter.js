const router = require('express').Router()
const userController = require('../controller/userController')
const {authUser} = require('../middleware/auth')
const authAdmin = require('../middleware/authAdminRole')

router.post('/register', userController.register)

router.post('/activation', userController.activateEmail)

router.post('/login', userController.login)

router.get('/logout', userController.logout)

router.post('/access', userController.getAccessToken)

router.post('/forgot', userController.forgotPassword)

router.post('/reset', authUser, userController.resetPassword)

router.get('/infor', authUser, userController.getUserInfor)

router.get('/all_infor', authUser, authAdmin, userController.getUsersAllInfor)


// router.get('/logout', userController.logout)

// router.patch('/update', auth, userController.updateUser)

// router.patch('/update_role/:id', auth, authAdmin, userController.updateUsersRole)

// router.delete('/delete/:id', auth, authAdmin, userController.deleteUser)


// // Social Login
// router.post('/google_login', userCtrl.googleLogin)

// router.post('/facebook_login', userCtrl.facebookLogin)


module.exports = router