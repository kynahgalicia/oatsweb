
const mongoose = require('mongoose')
const courseSchema = new mongoose.Schema({
    coursename: {type:String, required: true, unique: true},
    coursecode: {type:String, required:true, uniqie:true},
    department:
    {  id: {
            type: mongoose.Schema.ObjectId,
            ref: 'Department',
            required: true
        },
        deptname: {
            type: String,
            required: true
        },
        status: {
            type: String,
            default: 'Active'
        }
    },
    status: {
        type: String,
        default: 'Active'
    }
    
})

module.exports = mongoose.model('Course', courseSchema);