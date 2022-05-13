const catchAsyncErrors = require('../middleware/catchAsyncErrors')

const ViewLogs = require('../models/viewLogModel.js')
const Thesis = require('../models/thesisModel')
const Users = require('../models/userModel')
const Admins = require('../models/adminModel')
const Guests = require('../models/guestModel')
const Subscriptions = require('../models/subscriptionModel')
const Borrow = require('../models/borrowModel')
const Bookmarks = require('../models/bookmarkModel')
const SearchLogs = require('../models/searchLogModel');
const DownloadLogs = require('../models/downloadLogModel')

exports.viewLog = catchAsyncErrors(async(req,res,next) => {

    const thesis = await Thesis.findById(req.body.thesis_id);
    if(!thesis) return res.status(404).json({msg: "Thesis not found"})

    req.body.thesis_title = thesis.title
    req.body.thesis_department = thesis.department.deptname

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
    //Top Viewed Thesis
    const view = await ViewLogs.aggregate([ 
        { $match: {} }, 
        { $sortByCount: "$thesis_title" } 
    ]).limit(5)
    //Top Downloaded Thesis
    const download = await DownloadLogs.aggregate([ 
        { $match: {} }, 
        { $sortByCount: "$thesis_title" } 
    ]).limit(5)
    //Download per day
    const downloadpday = await DownloadLogs.aggregate([ 
        { $match: {} }, 
        { $sortByCount: { $dateToString: { format: "%Y-%m-%d", date: "$downloadAt"} }} 
    ]).limit(5)
    //Top Searched
    const search = await SearchLogs.aggregate([ 
        { $match: {} }, 
        { $sortByCount: "$keyword" } 
    ]).limit(5)
    //Subscription Types
    const subscription = await Subscriptions.aggregate([ 
        { $match: {} }, 
        { $sortByCount: "$sub_type" } 
    ])
    // Thesis Per department
    const thesisDept = await Thesis.aggregate([ 
        { $match: {} }, 
        { $sortByCount: "$department.deptname" } 
    ])
    //Top Borrowed
    const borrowTop = await Borrow.aggregate([ 
        { $match: {} }, 
        { $sortByCount: "$thesis.title" } 
    ]).limit(5)
    //Top Viewed per Department (Electrical)
    const elec = await ViewLogs.aggregate([ 
        { $match: {'thesis_department' : 'Electrical and Allied'} }, 
        { $sortByCount: '$thesis_title' } 
    ]).limit(5)
    //Top Viewed per Department (Mechanical)
    const mech = await ViewLogs.aggregate([ 
        { $match: {'thesis_department' : 'Mechanical and Allied'} }, 
        { $sortByCount: '$thesis_title' } 
    ]).limit(5)
    //Top Viewed per Department (BASD)
    const basd = await ViewLogs.aggregate([ 
        { $match: {'thesis_department' : 'Basic Arts and Science'} }, 
        { $sortByCount: '$thesis_title' } 
    ]).limit(5)
    //Top Viewed per Department (Civil)
    const civil = await ViewLogs.aggregate([ 
        { $match: {'thesis_department' : 'Civil and Allied'} }, 
        { $sortByCount: '$thesis_title' } 
    ]).limit(5)
    //Top Viewed per Department (BEng)
    const beng = await ViewLogs.aggregate([ 
        { $match: {'thesis_department' : 'Bachelor of Engineering'} }, 
        { $sortByCount: '$thesis_title' } 
    ]).limit(5)
    //Top Borrows per Department (Electrical)
    const elecB = await Borrow.aggregate([ 
        { $match: {'thesis.department' : 'Electrical and Allied'} }, 
        { $sortByCount: '$thesis.title' } 
    ]).limit(5)
    //Top Borrows per Department (Electrical)
    const mechB = await Borrow.aggregate([ 
        { $match: {'thesis.department' : 'Mechanical and Allied'} }, 
        { $sortByCount: '$thesis.title' } 
    ]).limit(5)
    //Top Borrows per Department (Civil)
    const civilB = await Borrow.aggregate([ 
        { $match: {'thesis.department' : 'Civil and Allied'} }, 
        { $sortByCount: '$thesis.title' } 
    ]).limit(5)
    //Top Borrows per Department (BASD)
    const basdB = await Borrow.aggregate([ 
        { $match: {'thesis.department' : 'Basic Arts and Science'} }, 
        { $sortByCount: '$thesis.title' } 
    ]).limit(5)
    //Top Borrows per Department (BEng)
    const bengB = await Borrow.aggregate([ 
        { $match: {'thesis.department' : 'Bachelor of Engineering'} }, 
        { $sortByCount: '$thesis.title' } 
    ]).limit(5)
    //Top Downloads per Department (Electrical)
    const elecD = await DownloadLogs.aggregate([ 
        { $match: {'thesis_department' : 'Electrical and Allied'} }, 
        { $sortByCount: '$thesis_title' } 
    ]).limit(5)
    //Top Downloads per Department (Electrical)
    const mechD = await DownloadLogs.aggregate([ 
        { $match: {'thesis_department' : 'Mechanical and Allied'} }, 
        { $sortByCount: '$thesis_title' } 
    ]).limit(5)
    //Top Downloads per Department (Civil)
    const civilD= await DownloadLogs.aggregate([ 
        { $match: {'thesis_department' : 'Civil and Allied'} }, 
        { $sortByCount: '$thesis_title' } 
    ]).limit(5)
    //Top Downloads per Department (BASD)
    const basdD = await DownloadLogs.aggregate([ 
        { $match: {'thesis_department' : 'Basic Arts and Science'} }, 
        { $sortByCount: '$thesis_title' } 
    ]).limit(5)
    //Top Borrows per Department (BEng)
    const bengD = await DownloadLogs.aggregate([ 
        { $match: {'thesis_department' : 'Bachelor of Engineering'} }, 
        { $sortByCount: '$thesis_title' } 
    ]).limit(5)

    res.status(200).json({
        bengD: bengD,
        basdD: basdD,
        civilD:civilD,
        mechD: mechD,
        elecD: elecD,
        bengB: bengB,
        basdB: basdB,
        civilB:civilB,
        mechB: mechB,
        elecB: elecB,
        beng: beng,
        civil: civil,
        basd: basd,
        mech: mech,
        elec: elec,
        view:view,
        search:search,
        download: download,
        downloadpday: downloadpday,
        subscription: subscription,
        thesisDept: thesisDept,
        borrowTop: borrowTop
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

exports.viewedThesisDepartment = catchAsyncErrors(async(req,res,next) => {

    try {
        const borrows = await Borrow.find()
        const deptThesis = await Thesis.find()

        let EAD = []
        let CAD = []
        let MAD = []
        let BENG = []
    borrows.forEach(result => {
    
        deptThesis.forEach(thesis => {

            if(result.thesis.title === thesis.title ){

                if(thesis.department.deptname === 'Electrical and Allied'){
                    EAD.push(result._id)
                }
                if(thesis.department.deptname === 'Civil and Allied'){
                    CAD.push(result._id)
                }
                if(thesis.department.deptname === 'Mechanical and Allied'){
                    MAD.push(result._id)
                }
                if(thesis.department.deptname === 'Bachelor of Engineering'){
                    BENG.push(result._id)
                }


            }
        });
    });

    await Borrow.updateMany({_id: { $in: BENG}}, { $set: {'thesis.department': 'Bachelor of Engineering' }});
    await Borrow.updateMany({_id: { $in: EAD}}, { $set: {'thesis.department': 'Electrical and Allied' }});
    await Borrow.updateMany({_id: { $in: MAD}}, { $set: {'thesis.department': 'Mechanical and Allied' }});
    await Borrow.updateMany({_id: { $in: CAD}}, { $set: {'thesis.department': 'Civil and Allied' }});
    
    res.status(200).json({
        success: true
    })
    } catch (error) {
        res.json({
            msg: error
        })
    }
    

})


exports.dataCount = catchAsyncErrors(async(req,res,next) => {


    const thesisCount = await Thesis.countDocuments();
    const userCount = await Users.countDocuments();
    const adminCount = await Admins.countDocuments();
    const guestCount = await Guests.countDocuments();
    const subCount = await Subscriptions.countDocuments();
    const subCountP = await Subscriptions.find({status: 'Pending'}).count()
    const subCountEx = await Subscriptions.find({status: 'Expired'}).count()
    const subCountAct = await Subscriptions.find({status: 'Active'}).count()
    const borrowCount = await Borrow.find({status: 'Active'}).count()
    const borrowCountP = await Borrow.find({status: 'Pending'}).count()
    const borrowCountOD = await Borrow.find({status: 'Overdue'}).count()
    const borrowCountR = await Borrow.find({status: 'Returned'}).count()

    res.status(200).json({
        thesisCount: thesisCount,
        userCount: userCount,
        adminCount: adminCount,
        guestCount: guestCount,
        subCount: subCount,
        subCountP: subCountP,
        subCountEx: subCountEx,
        subCountAct: subCountAct,
        borrowCount: borrowCount,
        borrowCountP:borrowCountP,
        borrowCountR:borrowCountR,
        borrowCountOD:borrowCountOD
    })


})

exports.studentDataCount = catchAsyncErrors(async(req,res,next) => {
    const user_id = req.params.user
    
    console.log(user_id)
    const bookmarks = await Bookmarks.find({user_id}).count()
    const borrowCount = await Borrow.find({ 'user.id' : user_id ,status: "Active", dateReturned: null}).count()
    const thesisCount = await Thesis.find({ 'uploadedBy.id' : user_id}).count()
    
    res.status(200).json({
        bookmarksCount: bookmarks,
        borrowCount: borrowCount,
        thesisCount: thesisCount

    })

})

exports.guestDataCount = catchAsyncErrors(async(req,res,next) => {
    const user_id = req.params.user
    
    console.log(user_id)
    const bookmarks = await Bookmarks.find({user_id}).count()
    
    res.status(200).json({
        bookmarksCount: bookmarks

    })

})