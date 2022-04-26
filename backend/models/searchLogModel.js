const mongoose = require('mongoose')
const searchSchema = new mongoose.Schema({
    keyword:{
        type: String,
        required: true
    },
    searchedAt: {
        type: Date,
        default: Date.now
    }

}
)
module.exports = mongoose.model("SearchLogs", searchSchema)