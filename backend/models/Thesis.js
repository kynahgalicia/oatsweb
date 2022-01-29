const mongoose = require('mongoose')

const thesisSchema = new mongoose.Schema({
    title: {type: String, required: [true, 'Please enter Thesis title'],trim: true,},
    author: [{type: String}],
    keywords: [{type: String}],
    abstract: {type:String},
    department:{type: String},
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Thesis', thesisSchema);