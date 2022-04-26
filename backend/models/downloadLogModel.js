const mongoose = require('mongoose')
const downloadSchema = new mongoose.Schema({
    thesis_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Thesis',
        required: true
    },
    thesis_title:{
        type: String,
        required: true
    },
    thesis_department:{
        type: String,
        required: true
    },
    downloadAt: {
        type: Date,
        default: Date.now
    }

}
)
module.exports = mongoose.model("DownloadLogs", downloadSchema)