const mongoose = require('mongoose')
const viewSchema = new mongoose.Schema({
    thesis_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Thesis',
        required: true
    },
    thesis_title:{
        type: String,
        required: true
    },
    viewedAt: {
        type: Date,
        default: Date.now
    }

}
)
module.exports = mongoose.model("ViewLogs", viewSchema)