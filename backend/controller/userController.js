const Users = require('../models/userModel')
const Department = require('../models/departmentModel')
const Course = require('../models/courseModel')
const Subscriptions = require('../models/subscriptionModel')
const Borrow = require('../models/borrowModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require('./sendMail')
const sendMailPassword = require('./sendMailPassword')
const sendToken = require('../utils/jwtToken');
const {google} = require('googleapis')
const {OAuth2} = google.auth
// const fetch = require('node-fetch')

// const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)

const {FRONTEND_URL} = process.env

const userController = {

    // /user/register
    register: async (req, res) => {
        try {
            const {user_fname, user_lname,user_tupid, user_contact, departments, courses,  user_tupmail, passwords } = req.body

            console.log(req.body)
            
            if(!user_fname || !user_lname || !user_tupid || !user_tupmail || !user_contact || !departments || !courses  || !passwords )
                return res.status(400).json({msg: "Please fill in all fields."})


            if(!validateEmail(user_tupmail))
                return res.status(401).json({msg: "Invalid email."})

            if (!(/@tup.edu.ph\s*$/.test(user_tupmail))) 
                return res.status(402).json({msg: "Invalid Email"})

            if (!(/\bTUPT-\d{2}-\d{4}$/.test(user_tupid))) 
                return res.status(403).json({msg: "Invalid ID format"})

            const user = await Users.findOne({user_tupmail})
            if(user) return res.status(405).json({msg: "This email already exists."})

            if(user_contact.length < 11 || user_contact.length > 11)
                return res.status(406).json({msg: "contact must be 11 numbers."})

            if (/[a-zA-Z]$/.test(user_contact)) 
            return res.status(406).json({msg: "Invalid Contact Number"})

            if (/\b09\d{9}$/.test(user_contact)) 
            return res.status(406).json({msg: "Invalid Contact Number Format"})

            if(passwords.length < 6)
                return res.status(407).json({msg: "Password must be at least 6 characters."})

            const user_password = await bcrypt.hash(passwords, 12)
            
            const uDept = await Department.findById(req.body.departments);
            const uCourse = await Course.findById(req.body.courses);

            const user_department ={ 
                departments: uDept._id,
                deptname: uDept.deptname
            }
            const user_course = {
                courses: uCourse._id,
                coursecode: uCourse.coursecode,
                coursename: uCourse.coursename
            }

            const newUser = {
                user_fname, user_lname,user_tupid, user_contact, user_department, user_course,  user_tupmail,user_password
            }

            const activation_token = createActivationToken(newUser)

            console.log(newUser)
        
            const url = `${FRONTEND_URL}/user/activate/${activation_token}`
            //sendMail(user_tupmail, url, "Verify your email address")


            res.json({
            msg: "Register Success! Please activate your email to start.", 
            // activation: activation_token
        })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    // /user/activation
    emailValidation: async (req, res) => {
        try {
            const {email} = req.body

            if (!(/@tup.edu.ph\s*$/.test(email))) {
                return res.status(400).json({msg: "Invalid Email"})
            }else{
                res.json({
                    msg: "Success"})
            }

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    // /user/activation
    activateEmail: async (req, res) => {
        try {
            const {activation_token} = req.body
            const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)

            const {user_fname, user_lname,user_tupid, user_contact, user_department, user_course,  user_tupmail, user_password} = user

            const check = await Users.findOne({user_tupmail})
            if(check) return res.status(400).json({msg:"This email already exists."})

            const newUser = new Users({
                user_fname, user_lname,user_tupid, user_contact, user_department, user_course, user_tupmail, user_password
            })

            await newUser.save()

            res.json({msg: "Account has been activated!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    // /user/login
    login: async (req, res) => {
        try {
            const {user_tupmail, user_password} = req.body
            const user = await Users.findOne({user_tupmail})
            if(!user) return res.status(400).json({msg: "This email does not exist. Please register first."})

            const userStatus = await Users.findOne({'user_tupmail': user_tupmail, 'user_status': 'Deactivated'})
            if(userStatus) return res.status(400).json({msg: "This account is deactivated"})

            const isMatch = await bcrypt.compare(user_password, user.user_password)
            if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})
            
            // console.log(user)   

            const refresh_token = createRefreshToken({id: user._id})
            
            res.json({
                msg: "Login success!",
                token: refresh_token,
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    // /user/cookie 
    getAccessToken: (req, res) => {

        try {
            const {rf_token} = req.body
            if(!rf_token) return res.status(400).json({msg: "Please login now!"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if(err) return res.status(400).json({msg: "Please login now jwt!"})

                const access_token = createAccessToken({id: user.id})
                res.json({
                    token: access_token
                })
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },


    // /user/forgot
    forgotPassword: async (req, res) => {
        try {
            const {user_tupmail} = req.body
            const user = await Users.findOne({user_tupmail})
            if(!user) return res.status(400).json({msg: "This email does not exist."})

            const access_token = createAccessToken({id: user._id})
            const url = `${FRONTEND_URL}/user/reset/${access_token}`

            //sendMailPassword(user_tupmail, url, "Reset your password")
            res.json({msg: "Reset request sent! Please check your email."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    // /user/reset
    resetPassword: async (req, res) => {
        try {
            const {user_password} = req.body
            const passwordHash = await bcrypt.hash(user_password, 12)

            if(user_password.length < 6)
                return res.status(400).json({msg: "Password must be at least 6 characters."})

            await Users.findOneAndUpdate({_id: req.user.id}, {
                user_password: passwordHash
            })

            res.json({msg: "Password successfully changed!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }, 

    // /user/infor
    getUserInfor: async (req, res) => {

        const user_id = req.user.id
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
        const user = await Users.findById(req.user.id).select('-user_password')
        const subType = await Subscriptions.findOne({'user.user_id' :user_id})
        const borrow = await Borrow.find({'user.id': user_id, 'status' : 'Overdue'}).count();
        
        

        res.json({
                user: user,
                msg: "Success User",
                subType: subType,
                overdueCount: borrow
        })
                
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
    },


    //pwedeng alisin to dito kase pang admin lang to 
    // /user/all_infor
    getUsersAllInfor: async (req, res) => {
        try {
            
            
            const users = await Users.find()

            
                res.json({
                    users: users,
                })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    //user/inforAdmin
    getUserInforAdmin : async(req,res) => {
        try {
            let user = await Users.findById(req.params.id);

            if(!user)
            return res.status(400).json({msg: "User not found"})
            
            res.status(200).json({
                success: true,
                user:user
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    updateProfile: async (req,res) => {

        const {user_contact, user_fname, user_lname} = req.body
        let user = await Users.findById(req.params.id);

        if(!user)
        return res.status(400).json({msg: "User not found"})

        if(user_contact.length < 11)
                return res.status(400).json({msg: "contact must be at least 11 numbers."})
        
        
        if(!user_fname || !user_lname || !user_contact )
        return res.status(400).json({msg: "Please fill in all fields."})
        
        try {

            user = await Users.findByIdAndUpdate(req.params.id,req.body,{
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
    //user/deactivate
    deactivate: async (req,res) => {
        let user = await Users.findById(req.params.id);
        if(!user)
        return res.status(400).json({msg: "User not found"})

        try {

            user = await Users.findByIdAndUpdate(req.params.id,req.body,{
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
            await Users.findByIdAndDelete(req.params.id)
            res.json({msg: "User has been Deleted!", success: true})
        } catch (error) {
            return res.status(500).json({msg: err.message})
        }
    },

    // updateProfile : async (req,res) => {

    //     let user = await Users.findById(req.params.id);

    //     if(user)
    //     return res.status(400).json({msg: "User not found"})

    // },

    // /user/logout
    logout: async (req, res) => {
        try {
            res.cookie('refreshtoken', null, {
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
    
    module.exports = userController