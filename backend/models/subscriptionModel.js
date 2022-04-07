const mongoose = require('mongoose')
const subSchema = new mongoose.Schema({
    user_id: {
        type: String
    },
    user_name:{
        type:String
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
        default: "Pending"
    },
    expireAt:{ 
        type: Date,
        expires: 11,
        default:Date.now
    }  

}
// , {
//     timestamps: true
// }
)
module.exports = mongoose.model("Subscriptions", subSchema)