const mongoose = require('mongoose')


const thesisSchema = new mongoose.Schema({
    title:{
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    publishAt:{
        type: String,
        trim: true,
        required: true
    },
   author:[{
        type: String,
        required: true
    }],
   keyword:[{
        type: String,
        required: true
    }],
    department:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        trim: true,
        required: true
    },
    abstract:{
        type: String,
        required: true
    },
    file:{
        type: Object,
        required: true
    }
    
}, {
    timestamps: true //important
})


module.exports = mongoose.model("Thesis", thesisSchema)