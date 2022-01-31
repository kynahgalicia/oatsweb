
const mongoose = require('mongoose')
const deptSchema = new mongoose.Schema({
    deptname: {type:String, required: true, unique: true, minlength:10},
    deptcode: {type:String, required: true, unique: true}
})

module.exports = mongoose.model('Department', deptSchema);