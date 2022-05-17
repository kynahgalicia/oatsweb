const Admins = require('../models/adminModel')
const Department = require('../models/departmentModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require('./sendMail')
const sendToken = require('../utils/jwtToken');
const {google} = require('googleapis')
const {OAuth2} = google.auth
// const fetch = require('node-fetch')

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)

const {FRONTEND_URL} = process.env

const adminController = {

    // /admin/register
    register: async (req, res) => {
        try {
            const {admin_fname, admin_lname,admin_tupid, admin_contact, departments, admin_tupmail, passwords } = req.body

            console.log(req.body)
            
            if(!admin_fname || !admin_lname || !admin_tupid || !admin_tupmail || !admin_contact || !departments || !passwords )
                return res.status(400).json({msg: "Please fill in all fields."})

            if(!validateEmail(admin_tupmail))
                return res.status(401).json({msg: "Invalid emails."})
            
            if (!(/@tup.edu.ph\s*$/.test(admin_tupmail))) 
                return res.status(402).json({msg: "Invalid Email"})
                
                const adminID = await Admins.findOne({admin_tupid})
                if(adminID)return res.status(402).json({msg: "This ID already exists."})
                
                const admin = await Admins.findOne({admin_tupmail})
                if(admin) return res.status(403).json({msg: "This email already exists."})
                
                if(admin_contact.length < 11 || admin_contact.length > 11)
                return res.status(406).json({msg: "contact must be 11 numbers."})

            if (/[a-zA-Z]$/.test(admin_contact)) 
            return res.status(406).json({msg: "Invalid Contact Number"})

            if (!(/\b09\d{9}$/.test(admin_contact))) 
            return res.status(406).json({msg: "Invalid Contact Number Format"})

            if(passwords.length < 6)
                return res.status(405).json({msg: "Password must be at least 6 characters."})

            const admin_password = await bcrypt.hash(passwords, 12)
            
            const uDept = await Department.findById(req.body.departments);

            const admin_department ={ 
                departments: uDept._id,
                deptname: uDept.deptname
            }

            const newAdmin = {
                admin_fname, admin_lname,admin_tupid, admin_contact, admin_department, admin_tupmail,admin_password
            }

            const activation_token = createActivationToken(newAdmin)

            console.log(newAdmin)
        
            const url = `${FRONTEND_URL}/admin/activate/${activation_token}`
            sendMail(admin_tupmail, url, "Verify your email address")


            res.json({
            msg: "Register Success! Please activate your email to start.", 
            activation: activation_token,
            url: url})
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    // /admin/activation
    activateEmail: async (req, res) => {
        try {
            const {activation_token} = req.body
            const admin = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)

            const {admin_fname, admin_lname,admin_tupid, admin_contact, admin_department, admin_tupmail, admin_password} = admin

            const check = await Admins.findOne({admin_tupmail})
            if(check) return res.status(400).json({msg:"This email already exists."})

            const newAdmin = new Admins({
                admin_fname, admin_lname,admin_tupid, admin_contact, admin_department, admin_tupmail, admin_password
            })

            await newAdmin.save()

            res.json({msg: "Account has been activated!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    // /admin/login
    login: async (req, res) => {
        try {
            const {admin_tupmail, admin_password} = req.body
            const admin = await Admins.findOne({admin_tupmail})
            if(!admin) return res.status(400).json({msg: "This email does not exist."})

            const adminStatus = await Admins.findOne({'admin_tupmail': admin_tupmail,"role": 'Moderator', 'admin_status': 'Deactivated'})
            if(adminStatus) return res.status(400).json({msg: "This account is deactivated"})

            const isMatch = await bcrypt.compare(admin_password, admin.admin_password)
            if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})
            
            console.log(admin)   

            const refresh_token = createRefreshToken({id: admin._id})
        
            res.json({
                msg: "Login success!",
                token: refresh_token,
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    // /admin/cookie 
    getAccessToken: (req, res) => {

        try {
            const {rf_token} = req.body 
            if(!rf_token) return res.status(400).json({msg: "Please login now!"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, admin) => {
                if(err) return res.status(400).json({msg: "Please login now jwt!"})

                const access_token = createAccessToken({id: admin.id})
                res.json({adminToken: access_token})
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },


    // /admin/forgot
    forgotPassword: async (req, res) => {
        try {
            const {admin_tupmail} = req.body
            const admin = await Admins.findOne({admin_tupmail})
            if(!admin) return res.status(400).json({msg: "This email does not exist."})

            const access_token = createAccessToken({id: admin._id})
            const url = `${FRONTEND_URL}/admin/reset/${access_token}`

            // sendMail(admin_tupmail, url, "Reset your password")
            res.json({msg: "Reset requeset sent! Please check your email.",
                    url: url})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    // /admin/reset
    resetPassword: async (req, res) => {
        try {
            const {admin_password} = req.body
            const passwordHash = await bcrypt.hash(admin_password, 12)

            if(admin_password.length < 6)
                return res.status(400).json({msg: "Password must be at least 6 characters."})

            await Admins.findOneAndUpdate({_id: req.admin.id}, {
                admin_password: passwordHash
            })

            res.json({msg: "Password successfully changed!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }, 

    //admin/inforAdmin
    getAdminInforAdmin : async(req,res) => {
        try {
            let admin = await Admins.findById(req.params.id);

            if(!admin)
            return res.status(400).json({msg: "Admin not found"})
            
            
            res.status(200).json({
                success: true,
                admin:admin
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    // /admin/infor
    getAdminInfor: async (req, res) => {
        try {
            const admin = await Admins.findById(req.admin.id).select('-admin_password')

            res.json({admin: admin,
                    msg: "Success Admin"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    updateAdmin: async (req,res) => {
        let admin = await Admins.findById(req.params.id);

        if(!admin)
        return res.status(400).json({msg: "Admin not found"})

        try {

            admin = await Admins.findByIdAndUpdate(req.params.id,req.body,{
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
    //super/:id
    superAdmin: async (req,res) => {
        let admin = await Admins.findById(req.params.id);

        if(!admin)
        return res.status(400).json({msg: "Admin not found"})

        if(admin.role === 'Super Admin')
        return res.status(401).json({msg: "Already Super Admin"})

        const superNo = await Admins.find({role: 'Super Admin'}).count()
        if(superNo >= 2) {return res.status(401).json({msg: "Reached the Limit Number of Super Admin"})}


        const admin_department = {
            departments: null,
            deptname: 'Non-Academic'
        }

        const role = 'Super Admin'

        req.body.role = role
        req.body.admin_department = admin_department

        try {

            admin = await Admins.findByIdAndUpdate(req.params.id,req.body,{
                new: true,
                runValidators:true,
                useFindandModify:false
            })

            res.status(200).json({
                superNo,
                success: true
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    //moderator/:id
    moderatorAdmin: async (req,res) => {
        let admin = await Admins.findById(req.params.id);

        if(!admin)
        return res.status(400).json({msg: "Admin not found"})

        if(admin.role === 'Moderator')
        return res.status(401).json({msg: "Already Moderator"})

        const superNo = await Admins.find({role: 'Super Admin'}).count()
        if(superNo === 1) {return res.status(401).json({msg: "One Super Admin Must Remain"})}

        const cdept = await Department.findById(req.body.departments);

        const role = 'Moderator'
        const admin_department = {
            departments: cdept._id,
            deptname: cdept.deptname
        }

        req.body.role = role
        req.body.admin_department = admin_department

        try {

            admin = await Admins.findByIdAndUpdate(req.params.id,req.body,{
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
    //admin/deactivate
    deactivate: async (req,res) => {
        let admin = await Admins.findById(req.params.id);
        if(!admin)
        return res.status(400).json({msg: "Admin not found"})

        let adminSuperAdmin = await Admins.findById(req.params.id)
        if(adminSuperAdmin.role === 'Super Admin')
        return res.status(400).json({msg: "Super Admin can't be deactivated"})
        try {

            admin = await Admins.findByIdAndUpdate(req.params.id,{'admin_status': 'Deactivated'},{
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
    //admin/activate
    activate: async (req,res) => {
        let admin = await Admins.findById(req.params.id);
        if(!admin)
        return res.status(400).json({msg: "Admin not found"})

        try {

            admin = await Admins.findByIdAndUpdate(req.params.id,{'admin_status': 'Active'},{
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
    //admin/delete/:id
    softDelete: async (req,res) => {
        let admin = await Admins.findById(req.params.id);
        if(!admin)
        return res.status(400).json({msg: "Admin not found"})

        let adminSuperAdmin = await Admins.findById(req.params.id)
        if(adminSuperAdmin.role === 'Super Admin')
        return res.status(400).json({msg: "Super Admin can't be deleted"})

        try {

            admin = await Admins.findByIdAndUpdate(req.params.id,{'admin_status': 'Deleted'},{
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
    //admin/restore/:id
    restoreDelete: async (req,res) => {
        let admin = await Admins.findById(req.params.id);
        if(!admin)
        return res.status(400).json({msg: "Admin not found"})

        try {

            admin = await Admins.findByIdAndUpdate(req.params.id,{'admin_status': 'Active'},{
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
            await Admins.findByIdAndDelete(req.params.id)
            res.json({msg: "Admin has been Deleted!", success: true})
        } catch (error) {
            return res.status(500).json({msg: err.message})
        }
    },

    // /admin/all_infor
    getAdminsAllInfor: async (req, res) => {
        try {
            const admins = await Admins.find().sort({createdAt: -1}).select('-admin_password')

            res.json({admins:admins})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    // /admin/logout
    logout: async (req, res) => {
        try {
            res.cookie('refreshtokenadmin', null, {
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
    
    module.exports = adminController