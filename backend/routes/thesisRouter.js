<<<<<<< HEAD
const router = require('express').Router()
const thesisController = require('../controllers/thesisController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/thesis')
//may admin
    // .get(thesisController.getThesis)
    // .post(auth, authAdmin, thesisController.createThesis)


    //wala

    .get(thesisController.getThesis)
    .post( thesisController.createThesis)


router.route('/thesis/:id')

//may admin
    // .delete(auth, authAdmin, thesisController.deleteThesis)
    // .put(auth, authAdmin, thesisController.updateThesis)

    //wala
    .delete(thesisController.deleteThesis)
    .put( thesisController.updateThesis)


=======

const router = require('express').Router()
const thesisController = require('../controller/thesisController')


router.get('/thesis',thesisController.get)
router.get('/thesisCount',thesisController.thesisCount)
router.get('/thesis/:id',thesisController.find)
router.post('/thesis/new', thesisController.create)
router.delete('/api/thesis/delete/:id', thesisController.delete)
>>>>>>> frontend

module.exports = router