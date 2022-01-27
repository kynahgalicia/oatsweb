const mongoose = require('mongoose')

const downloadSchema = new mongoose.Schema({
    thesislist: [{
        thesis: {type: mongoose.Schema.ObjectId, ref: 'Thesis',required: true},
        title: {type: String,required: true}
    }],
    downloadedAt: {type: Date, default: Date.now},
})

module.exports = mongoose.model('Download', downloadSchema);