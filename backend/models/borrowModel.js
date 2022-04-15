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
            ref: 'Admins',
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

    dateBorrowed : {
        type : Date,
        required: [true, 'Please input borrow date']
    },
    
    dueDate: {
        type: Date,
        required: [true, 'Input your due date']
    },

    dateReturned: {
        type: Date,
        default: ""
    }

})

module.exports = mongoose.model('Borrow', borrowSchema);