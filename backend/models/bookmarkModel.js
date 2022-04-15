const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const bookmarkSchema = new mongoose.Schema({
    user_id: {
        type: String
    },
    thesis: {  
        id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Thesis',
        required: true
        },
        title: {
            type: String,
            required: true
        },
        abstract: {
            type:String
        },
        publishedAt:{
            type:Number
        }
        }
}, {
    timestamps: true
})

module.exports = mongoose.model("Bookmarks", bookmarkSchema)