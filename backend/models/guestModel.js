const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const guestSchema = new mongoose.Schema({
    guest_fname: {
        type: String,
        required: [true, "Please enter your First name!"],
        trim: true
        
    },
    guest_lname: {
        type: String,
        required: [true, "Please enter your Last name!"],
        trim: true
        
    },
    guest_contact: {
        type: Number,
        required: [true, "Please enter your Contact Number!"],
        trim: false,
        unique: [true, "This number is already registered"]
        
    },
    guest_profession: {
        type: String,
        required: [true, "Please enter your Profession!"],
    },
    guest_company: {
        type: String,
        required: [true, "Please enter your Company!"],
    },
    guest_company_address: {
        type: String,
        required: [true, "Please enter your Company Address!"],
    },
    guest_mail: {
        type: String,
        required: [true, "Please enter your Email!"],
        trim: true,
        unique: [true, " This Email is already registered"]
    },
    guest_password: {
        type: String,
        required: [true, "Please enter your password!"],
        
    },
    guest_status:{
        type: String,
        default: "Active"
    },
    avatar: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
})

// Return JWT token
guestSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}
module.exports = mongoose.model("Guests", guestSchema)