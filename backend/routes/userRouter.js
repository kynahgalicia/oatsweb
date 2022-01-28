const router = require('express').Router()
const userController = require('../controllers/userController')
// const auth = require('../middleware/auth')
// const authAdmin = require('../middleware/authAdmin')

router.post('/register', userController.register)

router.post('/activation', userController.activateEmail)

router.post('/login', userController.login)

router.post('/refresh_token', userController.getAccessToken)

// router.post('/forgot', userCtrl.forgotPassword)

// router.post('/reset', auth, userCtrl.resetPassword)

// router.get('/infor', auth, userCtrl.getUserInfor)

// router.get('/all_infor', auth, authAdmin, userCtrl.getUsersAllInfor)

// router.get('/logout', userCtrl.logout)

// router.patch('/update', auth, userCtrl.updateUser)

// router.patch('/update_role/:id', auth, authAdmin, userCtrl.updateUsersRole)

// router.delete('/delete/:id', auth, authAdmin, userCtrl.deleteUser)


// // Social Login
// router.post('/google_login', userCtrl.googleLogin)

// router.post('/facebook_login', userCtrl.facebookLogin)


module.exports = router