const router = require('express').Router()
const courseController = require('../controller/courseController')


router.get('/course',courseController.get)
router.get('/course/:id',courseController.find)
router.post('/course/new', courseController.create)
router.put('/course/edit/:id', courseController.editCourse)
router.delete('/course/delete/:id', courseController.delete)

module.exports = router