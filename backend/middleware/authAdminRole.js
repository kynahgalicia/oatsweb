const Admins = require('../models/adminModel')

exports.authAdminRole = async (req, res, next) => {
    try {
        const admin = await Admins.findOne({_id: req.admin.id})
        
        if(!admin.admin_tupid) 
            return res.status(500).json({msg: "Admin resources access denied."})

        next()
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

exports.authSuperAdminRole = async (req, res, next) => {
    try {
        const admin = await Admins.findOne({_id: req.admin.id, role: 'Super Admin'})
        
        if(!admin.admin_tupid) 
            return res.status(500).json({msg: "Super Admin resources access denied."})

        next()
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}