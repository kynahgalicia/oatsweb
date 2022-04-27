const router = require('express').Router()
const loggingController = require('../controller/loggingController')

router.post('/view/log', loggingController.viewLog)
router.post('/search/log', loggingController.searchLog)
router.post('/download/log', loggingController.downloadLog)
router.get('/home/count', loggingController.homeCount)
router.get('/featured/count', loggingController.featuredCount)
router.get('/log/count', loggingController.logCount)
router.get('/data/count', loggingController.dataCount)
router.get('/student/count/:user', loggingController.studentDataCount)
router.get('/guest/count/:user', loggingController.guestDataCount)

module.exports = router