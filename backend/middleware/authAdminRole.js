const Admins = require('../models/adminModel')

const authAdminRole = async (req, res, next) => {
    try {
        const admin = await Admins.findOne({_id: req.admin.id})
        
        if(!admin.admin_tupid) 
            return res.status(500).json({msg: "Admin resources access denied."})

        next()
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = authAdminRole