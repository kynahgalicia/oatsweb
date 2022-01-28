const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require('./sendMail')

const {google} = require('googleapis')
const {OAuth2} = google.auth
// const fetch = require('node-fetch')

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)

const {FRONTEND_URL} = process.env

const userController = {
    register: async (req, res) => {
        try {
            const {user_fname, user_lname,user_tupid, user_contact, user_section,  user_tupmail, user_password } = req.body
            
            if(!user_fname || !user_lname || !user_tupmail || !user_contact || !user_section  || !user_password )
                return res.status(400).json({msg: "Please fill in all fields."})

            if(!validateEmail(user_tupmail))
                return res.status(400).json({msg: "Invalid emails."})

            const user = await Users.findOne({user_tupmail})
            if(user) return res.status(400).json({msg: "This email already exists."})

            if(user_contact.length < 11)
                return res.status(400).json({msg: "contact must be at least 11 numbers."})

            if(user_password.length < 6)
                return res.status(400).json({msg: "Password must be at least 6 characters."})

            const passwordHash = await bcrypt.hash(user_password, 12)
            
            const newUser = {
                user_fname, user_lname,user_tupid, user_contact, user_section, user_tupmail, user_password: passwordHash
            }

            const activation_token = createActivationToken(newUser)

            const url = `${FRONTEND_URL}/user/activate/${activation_token}`
            sendMail(user_tupmail, url, "Verify your email address")


            res.json({msg: "Register Success! Please activate your email to start."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    activateEmail: async (req, res) => {
        try {
            const {activation_token} = req.body
            const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)

            const {user_fname, user_lname,user_tupid, user_contact, user_section,  user_tupmail, user_password} = user

            const check = await Users.findOne({user_tupmail})
            if(check) return res.status(400).json({msg:"This email already exists."})

            const newUser = new Users({
                user_fname, user_lname,user_tupid, user_contact, user_section,  user_tupmail, user_password
            })

            await newUser.save()

            res.json({msg: "Account has been activated!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    login: async (req, res) => {
        try {
            const {user_tupmail, user_password} = req.body
            const user = await Users.findOne({user_tupmail})
            if(!user) return res.status(400).json({msg: "This email does not exist."})

            const isMatch = await bcrypt.compare(user_password, user.user_password)
            if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})
            
            console.log(user)   
            const refresh_token = createRefreshToken({id: user._id})
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7 days
            })
            
            res.json({msg: "Login success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getAccessToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken
            if(!rf_token) return res.status(400).json({msg: "Please login now!"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if(err) return res.status(400).json({msg: "Please login now!"})

                const access_token = createAccessToken({id: user.id})
                res.json({access_token})
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }

}

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
    const createActivationToken = (payload) => {
        return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '5m'})
    }
    
    const createAccessToken = (payload) => {
        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
    }
    
    const createRefreshToken = (payload) => {
        return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
    }
    
    module.exports = userController