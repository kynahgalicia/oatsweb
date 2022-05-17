const Guests = require('../models/guestModel')
const Subscriptions = require('../models/subscriptionModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require('./sendMail')
const sendMailPassword = require('./sendMailPassword')
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
                return res.status(401).json({msg: "Invalid emails."})

            const guest = await Guests.findOne({guest_mail})
            if(guest) return res.status(402).json({msg: "This email already exists."})

            if(guest_contact.length < 11 || guest_contact.length > 11)
            return res.status(406).json({msg: "contact must be 11 numbers."})

            if (/[a-zA-Z]$/.test(guest_contact)) 
            return res.status(406).json({msg: "Invalid Contact Number"})

            if (/\b09\d{9}$/.test(guest_contact)) 
            return res.status(406).json({msg: "Invalid Contact Number Format"})

            if(passwords.length < 6)
                return res.status(405).json({msg: "Password must be at least 6 characters."})

            const guest_password = await bcrypt.hash(passwords, 12)
            

            const newGuest = {
                guest_fname, guest_lname, guest_contact, guest_profession, guest_company,  guest_company_address, guest_mail, guest_password
            }

            const activation_token = createActivationToken(newGuest)

            console.log(newGuest)
        
            const url = `${FRONTEND_URL}/guest/activate/${activation_token}`
            //sendMail(guest_mail, url, "Verify your email address")


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

            const guestStatus = await Guests.findOne({'guest_mail': guest_mail, 'guest_status': 'Deactivated'})
            if(guestStatus) return res.status(400).json({msg: "This account is deactivated"})

            const isMatch = await bcrypt.compare(guest_password, guest.guest_password)
            if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})
            
            console.log(guest)   

            const refresh_token = createRefreshToken({id: guest._id})

            res.json({
                msg: "Login success!",
                token: refresh_token,
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    // /guest/cookie 
    getAccessToken: (req, res) => {

        try {
            const {rf_token} = req.body
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
            console.log(guest_mail)
            const guest = await Guests.findOne({guest_mail})
            if(!guest) return res.status(400).json({msg: "This email does not exist."})

            const access_token = createAccessToken({id: guest._id})
            const url = `${FRONTEND_URL}/guest/reset/${access_token}`

            //sendMailPassword(guest_mail, url, "Reset your password")
            res.json({msg: "Reset request sent! Please check your email."})
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
        
        const user_id = req.guest.id
        try {
            const subscription = await Subscriptions.findOne({'user.user_id' : user_id})
            
            let expired = ''
            if(subscription && subscription.status === 'Active'){
                const date1 = subscription.activatedAt;
                const date2 = Date.now();
                const diffTime = Math.abs(date2 - date1);
                const diffHours = Math.ceil(diffTime / (1000 * 60 * 60)); 
    
                console.log(diffHours + 'hours')
                if(subscription.sub_type === 'oneDay' && diffHours >= 24 ){
                    expired = subscription._id
                }
                if(subscription.sub_type === 'weekly' && diffHours >= 168 ){
                    expired = subscription._id
                }
    
            }
            console.log(expired)
            if(expired){
            await Subscriptions.updateOne({'_id': expired},{'status': 'Expired'},{
                new: true,
                runValidators:true,
                useFindandModify:false
            })}
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }

        try {
            const guest = await Guests.findById(req.guest.id).select('-guest_password')
            const subType = await Subscriptions.findOne({'user.user_id' :user_id})

            res.json({
                guest: guest,
                msg: "Success User",
                subType: subType
                })
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

    updateProfile: async (req,res) => {

        const {guest_fname, guest_lname, guest_contact, guest_profession, guest_company,  guest_company_address } = req.body

        if(!guest_fname || !guest_lname ||  !guest_contact ||  !guest_profession || !guest_company || !guest_company_address )
            return res.status(400).json({msg: "Please fill in all fields."})

        if(guest_contact.length < 11)
        return res.status(400).json({msg: "contact must be at least 11 numbers."})
        
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

    //guest/delete/:id
    softDelete: async (req,res) => {
        let guest = await Guests.findById(req.params.id);
        if(!guest)
        return res.status(400).json({msg: "User not found"})

        try {

            guest = await Guests.findByIdAndUpdate(req.params.id,{'guest_status' : 'Deleted'},{
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
    //guest/delete/:id
    restoreDelete: async (req,res) => {
        let guest = await Guests.findById(req.params.id);
        if(!guest)
        return res.status(400).json({msg: "User not found"})

        try {

            guest = await Guests.findByIdAndUpdate(req.params.id,{'guest_status' : 'Active'},{
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
    // delete: async (req,res) => {
    //     try {
    //         await Guests.findByIdAndDelete(req.params.id)
    //         res.json({msg: "Guest has been Deleted!", success: true})
    //     } catch (error) {
    //         return res.status(500).json({msg: err.message})
    //     }
    // },


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