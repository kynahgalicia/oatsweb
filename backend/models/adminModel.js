const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const adminSchema = new mongoose.Schema({
    admin_tupid: {
        type: String,
        required: [true, "Please enter your ID!"],
        trim: true,
        unique: true
    },
    admin_fname: {
        type: String,
        required: [true, "Please enter your First name!"],
        trim: true
        
    },
    admin_lname: {
        type: String,
        required: [true, "Please enter your Last name!"],
        trim: true
        
    },
    admin_contact: {
        type: Number,
        required: [true, "Please enter your Contact Number!"],
        trim: true,
        unique: true
        
    },
    admin_tupmail: {
        type: String,
        required: [true, "Please enter your Email!"],
        trim: true,
        unique: true
    },
    admin_password: {
        type: String,
        required: [true, "Please enter your password!"],
        
    },
    admin_department:{ 
        departments: {
            type: String,
            default: null
        },
        deptname: {
            type: String,
            default: 'Non-Academic'
        }
    },
    admin_status:{
        type: String,
        default: "Active"
    },
    role:{
        type: String,
        default: "Moderator"
    },
    avatar: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
})

// Return JWT token
adminSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}
module.exports = mongoose.model("Admins", adminSchema)