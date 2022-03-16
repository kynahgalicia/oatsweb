const Guests = require('../models/guestModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require('./sendMail')
const sendToken = require('../utils/jwtToken');
const {google} = require('googleapis')
const {OAuth2} = google.auth
// const fetch = require('node-fetch')

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)

const {FRONTEND_URL} = process.env

const guestController = {

    // /guest/register
    register: async (req, res) => {
        try {
            const {guest_fname, guest_lname, guest_contact, guest_profession, guest_company,  guest_company_address, guest_mail, passwords } = req.body

            console.log(req.body)
            
            if(!guest_fname || !guest_lname ||  !guest_contact ||  !guest_profession || !guest_company || !guest_company_address || !guest_mail || !passwords )
                return res.status(400).json({msg: "Please fill in all fields."})

            if(!validateEmail(guest_mail))
                return res.status(400).json({msg: "Invalid emails."})

            const guest = await Guests.findOne({guest_mail})
            if(guest) return res.status(400).json({msg: "This email already exists."})

            if(guest_contact.length < 11)
                return res.status(400).json({msg: "contact must be at least 11 numbers."})

            if(passwords.length < 6)
                return res.status(400).json({msg: "Password must be at least 6 characters."})

            const guest_password = await bcrypt.hash(passwords, 12)
            

            const newGuest = {
                guest_fname, guest_lname, guest_contact, guest_profession, guest_company,  guest_company_address, guest_mail, guest_password
            }

            const activation_token = createActivationToken(newGuest)

            console.log(newGuest)
        
            const url = `${FRONTEND_URL}/guest/activate/${activation_token}`
            // sendMail(guest_mail, url, "Verify your email address")


            res.json({
            msg: "Register Success! Please activate your email to start.", 
            activation: activation_token})
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    // /guest/activation
    activateEmail: async (req, res) => {
        try {
            const {activation_token} = req.body
            const guest = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)

            const {guest_fname, guest_lname, guest_contact, guest_profession, guest_company,  guest_company_address, guest_mail, guest_password} = guest

            const check = await Guests.findOne({guest_mail})
            if(check) return res.status(400).json({msg:"This email already exists."})

            const newGuest = new Guests({
                guest_fname, guest_lname, guest_contact, guest_profession, guest_company,  guest_company_address, guest_mail,  guest_password
            })

            await newGuest.save()

            res.json({msg: "Account has been activated!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    // /guest/login
    login: async (req, res) => {
        try {
            const {guest_mail, guest_password} = req.body
            const guest = await Guests.findOne({guest_mail})
            if(!guest) return res.status(400).json({msg: "This email does not exist."})

            const isMatch = await bcrypt.compare(guest_password, guest.guest_password)
            if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})
            
            console.log(guest)   

            const refresh_token = createRefreshToken({id: guest._id})

            const options = {
                expires: new Date(
                    Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000 //7days
                ),
                httpOnly: true
            }
        
            res.status(200).cookie('refreshtokenguest', refresh_token, options).json({
                success: true,
                refresh_token,
                guest,
                msg: "Login success!"
            })

            
            
            // res.cookie('refreshtoken', refresh_token, {
            //     httpOnly: true,
            //     path: '/guest/refresh_token',
            //     maxAge: 7*24*60*60*1000 // 7 days
            // })
            
            // sendToken(guest, 200, res)
            // res.json({msg: "Login success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    // /guest/cookie 
    getAccessToken: (req, res) => {
        // try{
        // const rf_token = req.cookies.token
        // if(!rf_token) return res.status(400).json({msg: "Please login now!"})
        // res.json({msg: "Cookie Found",
        //         token: rf_token})
        // } catch (err) {
        //     return res.status(500).json({msg: err.message})
        // }

        try {
            const rf_token = req.cookies.refreshtokenguest
            if(!rf_token) return res.status(400).json({msg: "Please login now!"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, guest) => {
                if(err) return res.status(400).json({msg: "Please login now jwt!"})

                const access_token = createAccessToken({id: guest.id})
                res.json({token: access_token})
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },


    // /guest/forgot
    forgotPassword: async (req, res) => {
        try {
            const {guest_mail} = req.body
            const guest = await Guests.findOne({guest_mail})
            if(!guest) return res.status(400).json({msg: "This email does not exist."})

            const access_token = createAccessToken({id: guest._id})
            const url = `${FRONTEND_URL}/guest/reset/${access_token}`

            sendMail(guest_mail, url, "Reset your password")
            res.json({msg: "Reset requeset sent! Please check your email."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    // /guest/reset
    resetPassword: async (req, res) => {
        try {
            const {guest_password} = req.body
            const passwordHash = await bcrypt.hash(guest_password, 12)

            if(guest_password.length < 6)
                return res.status(400).json({msg: "Password must be at least 6 characters."})

            await Guests.findOneAndUpdate({_id: req.guest.id}, {
                guest_password: passwordHash
            })

            res.json({msg: "Password successfully changed!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }, 

    // /guest/infor
    getGuestInfor: async (req, res) => {
        try {
            const guest = await Guests.findById(req.guest.id).select('-guest_password')

            res.json({guest: guest,
                    msg: "Success Guest"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },


    //pwedeng alisin to dito kase pang admin lang to 
    // /guest/all_infor
    getGuestsAllInfor: async (req, res) => {
        try {
            const guests = await Guests.find()

            res.json({guests: guests,
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    //guest/inforAdmin
    getGuestInforAdmin : async(req,res) => {
        try {
            let guest = await Guests.findById(req.params.id);

            if(!guest)
            return res.status(400).json({msg: "Guest not found"})
            
            res.status(200).json({
                success: true,
                guest:guest
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    updateAdmin: async (req,res) => {
        let guest = await Guests.findById(req.params.id);

        if(!guest)
        return res.status(400).json({msg: "Guest not found"})

        try {

            guest = await Guests.findByIdAndUpdate(req.params.id,req.body,{
                new: true,
                runValidators:true,
                useFindandModify:false
            })

            res.status(200).json({
                success:true
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
     //guest/deactivate
    deactivate: async (req,res) => {
        let guest = await Guests.findById(req.params.id);
        if(!guest)
        return res.status(400).json({msg: "Guest not found"})

        try {

            guest = await Guests.findByIdAndUpdate(req.params.id,req.body,{
                new: true,
                runValidators:true,
                useFindandModify:false
            })

            res.status(200).json({
                success:true
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    delete: async (req,res) => {
        try {
            await Guests.findByIdAndDelete(req.params.id)
            res.json({msg: "Guest has been Deleted!", success: true})
        } catch (error) {
            return res.status(500).json({msg: err.message})
        }
    },


    // updateProfile : async (req,res) => {

    //     let guest = await Guests.findById(req.params.id);

    //     if(guest)
    //     return res.status(400).json({msg: "Guest not found"})

    // },

    // /guest/logout
    logout: async (req, res) => {
        try {
            res.cookie('refreshtokenguest', null, {
                expires: new Date(Date.now()),
                httpOnly: true
            })
            res.status(200).json({
                success: true,
                msg: 'Logged out'
            })
            
        } catch (error) {
            return res.status(500).json({msg: err.message})
        }
    },

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
    
    module.exports = guestController