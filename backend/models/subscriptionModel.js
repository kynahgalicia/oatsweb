const mongoose = require('mongoose')
const subSchema = new mongoose.Schema({
    user_id: {
        type: String
    },
    reference_no: {
        type: String
    },
    sub_type:{
        type:String
    },
    reciept:{
        type:String
    },
    status:{
        type: String,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Subscriptions", subSchema)