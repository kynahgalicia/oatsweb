const mongoose = require('mongoose');
const validator = require('validator');

const borrowSchema = new mongoose.Schema({
    user: {  
        id:{
            type: mongoose.Schema.ObjectId,
            ref: 'Users',
            required: true
        },
        tupid: {
            type: String,
            required: true
        },
        fname: {
            type: String,
            required: true
        },
        lname:{
            type: String,
            required: true
        }
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
        }
    },
    admin: {  
        id:{
            type: mongoose.Schema.ObjectId,
            ref: 'Admins'
            
        },
        tupid: {
            type: String,
        },
        fname: {
            type: String,
        },
        lname:{
            type: String,
        }
    },

    dateBorrowed : {
        type : Date,
        default: null
    },
    
    dueDate: {
        type: Date,
        default: null
    },

    dateReturned: {
        type: Date,
        default: null
    },
    status: {
        type:String,
        default: "Pending"
    }

})

module.exports = mongoose.model('Borrow', borrowSchema);