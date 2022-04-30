const mongoose = require('mongoose')
const subSchema = new mongoose.Schema({
    user:{ 
        user_id: {
            type: String
        },
        user_name: {
            type: String
        }
    },
    user_role:{
        type: String
    },
    sender_name:{
        type:String,
        required: true
    },
    sender_no:{
        type:String,
        required: true
    },
    reference_no: {
        type: String,
        unique: true,
        required: true
    },
    sub_type:{
        type:String
    },
    reciept: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],
    status:{
        type: String,
        default: "Pending",
    },
    paidAt: {
        type: Date,
        default: Date.now
    }

}
)
module.exports = mongoose.model("Subscriptions", subSchema)