const mongoose = require('mongoose')

const thesisSchema = new mongoose.Schema({
    title: {
        type: String, 
        // required: [true, 'Please enter Thesis title'],
        trim: true,
    },
    publishedAt: {
        type: Number, 
        // required: true, 
        trim:true, 
    },
    authors: [
        {
            id: {
                type: mongoose.Schema.ObjectId,
            },
            author: {
                type: String,
                // required: true
            }
        }
    ],
    keywords: [
        {
            id: {
                type: mongoose.Schema.ObjectId,
            },
            keyword: {
                type: String,
                // required: true
            }
        }
    ],
    abstract: {
        type:String,
        trim: true,
    },
    department:{ 
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
    course:{ 
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
            type: String,
            required: true
        }
    }, 
    upload:{
        type: String,
        required:true
    },
    status:{
        type: String,
        default: "Active"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Thesis', thesisSchema);