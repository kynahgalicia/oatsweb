const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

const APIFeatures = require('../utils/apiFeatures')

const Bookmarks = require('../models/bookmarkModel.js')
const Thesis = require('../models/thesisModel.js')
exports.create = catchAsyncErrors(async(req,res,next) => {

    const cthesis = await Thesis.findById(req.body.theses)
    // console.log(req.body);

    req.body.thesis = {
        id: cthesis._id,
        title: cthesis.title,
        abstract: cthesis.abstract,
        publishedAt: cthesis.publishedAt
    }

    const {user_id, thesis} = req.body

    const mark = await Bookmarks.findOne({user_id, thesis})
    if(mark) return res.status(400).json({msg: "Already Bookmarked", mark})

    const bookmark = await Bookmarks.create(req.body);

    res.status(201).json({
        success: true,
        msg: "Bookmarked!"
    })

})

exports.find = catchAsyncErrors(async(req,res,next) => {
    const user_id = req.params.id
    const bookmarks = await Bookmarks.find({user_id});

    if(!bookmarks) return res.status(200).json({msg: "No Bookmarks"})
    
    res.status(200).json({
        success: true,
        bookmarks

    })

})

exports.delete = catchAsyncErrors(async(req,res,next) =>{
    try {
        await Bookmarks.findByIdAndDelete(req.params.id)
        res.json({msg: "Bookmark has been deleted!", success: true})
    } catch (error) {
        return res.status(500).json({msg: err.message})
    }
})
