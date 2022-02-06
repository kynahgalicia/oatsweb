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
    user_department:{ 
        departments: {
            type: mongoose.Schema.ObjectId,
            ref: 'Department',
            required: true
        },
        deptname: {
            type: String,
            required: true
        }
    },
    user_course:{ 
        courses: {
            type: mongoose.Schema.ObjectId,
            ref: 'Course',
            required: true
        },
        coursecode: {
            type: String,
            required: true
        },
        coursename:{
            type:String
        }
    },
    avatar: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Users", userSchema)