const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    user_tupid: {
        type: String,
        required: [true, "Please enter your TUP ID!"],
        trim: true,
        unique: true
    },
    user_fname: {
        type: String,
        required: [true, "Please enter your First name!"],
        trim: true
        
    },
    user_lname: {
        type: String,
        required: [true, "Please enter your Last name!"],
        trim: true
        
    },
    user_contact: {
        type: Number,
        required: [true, "Please enter your Contact Number!"],
        trim: true,
        unique: true
        
    },
    user_tupmail: {
        type: String,
        required: [true, "Please enter your TUP Email!"],
        trim: true,
        unique: true
    },
    user_password: {
        type: String,
        required: [true, "Please enter your password!"],
        
    },
    user_section: {
        type: String,
        required: [true, "Please enter your Section!"],
        trim: true
        
    },
    avatar: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Users", userSchema)