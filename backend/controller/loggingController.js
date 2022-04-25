const catchAsyncErrors = require('../middleware/catchAsyncErrors')

const ViewLogs = require('../models/viewLogModel.js')
const Thesis = require('../models/thesisModel')
const Users = require('../models/userModel')
const Admins = require('../models/adminModel')
const Guests = require('../models/guestModel')
const Subscriptions = require('../models/subscriptionModel')
const Borrow = require('../models/borrowModel')
const SearchLogs = require('../models/searchLogModel');
const DownloadLogs = require('../models/downloadLogModel')

exports.viewLog = catchAsyncErrors(async(req,res,next) => {

    const thesis = await Thesis.findById(req.body.thesis_id);
    if(!thesis) return res.status(404).json({msg: "Thesis not found"})

    req.body.thesis_title = thesis.title

    const view = await ViewLogs.create(req.body);

    console.log(view)

})
exports.downloadLog = catchAsyncErrors(async(req,res,next) => {

    const thesis = await Thesis.findById(req.body.thesis_id);
    if(!thesis) return res.status(404).json({msg: "Thesis not found"})

    req.body.thesis_title = thesis.title
    req.body.thesis_department = thesis.department.deptname

    const download = await DownloadLogs.create(req.body);

    console.log(download)

})

exports.searchLog = catchAsyncErrors(async(req,res,next) => {

    if(req.body) {
        const key = await SearchLogs.create(req.body)
    }
    
    res.status(200).json({
        success:true
    })

})

exports.logCount = catchAsyncErrors(async(req,res,next) => {

    const view = await ViewLogs.aggregate([ 
        { $match: {} }, 
        { $sortByCount: "$thesis_title" } 
    ]).limit(5)
    const download = await DownloadLogs.aggregate([ 
        { $match: {} }, 
        { $sortByCount: "$thesis_title" } 
    ]).limit(5)
    const downloadpday = await DownloadLogs.aggregate([ 
        { $match: {} }, 
        { $sortByCount: { $dateToString: { format: "%Y-%m-%d", date: "$downloadAt"} }} 
    ]).limit(5)
    const search = await SearchLogs.aggregate([ 
        { $match: {} }, 
        { $sortByCount: "$keyword" } 
    ]).limit(5)

    res.status(200).json({
        view:view,
        search:search,
        download: download,
        downloadpday: downloadpday
    })

})
exports.homeCount = catchAsyncErrors(async(req,res,next) => {
    const view = await ViewLogs.aggregate([ 
        { $match: {} }, 
        { $sortByCount: "$thesis_id" } 
    ]).limit(3)

    var topView = []
    view.forEach(result => {
        
        topView.push(
        result._id
        )
        
    });

    const result = await Thesis.find( { _id: { $in: topView} } )

    var resultData = []
    result.forEach(result => {
        
        resultData.push(
        {
            _id: result._id,
            title:result.title,
            authors: result.authors
        }
        )
        
    });
    
    res.status(200).json({
        homeCount: resultData
    })

})

exports.featuredCount = catchAsyncErrors(async(req,res,next) => {

    const result = await Thesis.find().sort({createdAt: -1}).limit(3)

    var resultData = []
    result.forEach(result => {
        
        resultData.push(
        {
            _id: result._id,
            title:result.title,
            authors: result.authors,
            createdAt: result.createdAt
        }
        )
        
    });
    
    res.status(200).json({
        featuredCount: resultData
    })

})


exports.dataCount = catchAsyncErrors(async(req,res,next) => {


    const thesisCount = await Thesis.countDocuments();
    const userCount = await Users.countDocuments();
    const adminCount = await Admins.countDocuments();
    const guestCount = await Guests.countDocuments();
    const subCount = await Subscriptions.countDocuments();
    const borrowCount = await Borrow.find({dateReturned: null}).count()

    res.status(200).json({
        thesisCount: thesisCount,
        userCount: userCount,
        adminCount: adminCount,
        guestCount: guestCount,
        subCount: subCount,
        borrowCount: borrowCount
    })


})