const jwt = require('jsonwebtoken')


exports.authUser = (req, res, next) => {
    try {
        const token = req.header("Authorization")
        if(!token) return res.status(400).json({msg: "Invalid Authentication."})

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) return res.status(400).json({msg: "Invalid Authentication jwt."})

            req.user = user
            next()
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}
exports.authGuest = (req, res, next) => {
    try {
        const token = req.header("Authorization")
        if(!token) return res.status(400).json({msg: "Invalid Authentication."})

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, guest) => {
            if(err) return res.status(400).json({msg: "Invalid Authentication jwt."})

            req.guest = guest
            next()
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}
exports.authAdmin = (req, res, next) => {
    try {
        const token = req.header("Authorization")
        if(!token) return res.status(400).json({msg: "Invalid Authentication."})

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, admin) => {
            if(err) return res.status(400).json({msg: "Invalid Authentication test."})

            req.admin = admin
            next()
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}
