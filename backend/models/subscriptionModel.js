const mongoose = require('mongoose')
const subSchema = new mongoose.Schema({
    user_id: {
        type: String
    },
    sender_name:{
        type:String
    },
    sender_no:{
        type:String
    },
    reference_no: {
        type: String,
        unique: true
    },
    sub_type:{
        type:String
    },
    reciept:{
        type:String
    },
    status:{
        type: String,
        default: "Pending"
    },
    paidAt: {
        type: Date,
        default: Date.now
    }

}
)
module.exports = mongoose.model("Subscriptions", subSchema)