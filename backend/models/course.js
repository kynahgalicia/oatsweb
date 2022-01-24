const mongoose = require('mongoose')
const courseSchema = new mongoose.Schema({
    deptlist: [{
        dept: {type: mongoose.Schema.ObjectId, ref: 'Department',required: true},
        deptname: {type: String,required: true}
    }],
    coursename: {type:String, required: true, unique: true, minlength:10}
})

module.exports = mongoose.model('Course', courseSchema);