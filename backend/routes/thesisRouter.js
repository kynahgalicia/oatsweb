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



module.exports = router