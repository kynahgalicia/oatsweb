const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

const APIFeatures = require('../utils/apiFeatures')
const Department = require('../models/departmentModel')
const Course = require('../models/courseModel')
const Thesis = require('../models/thesisModel')
const Borrow = require('../models/borrowModel');
const Users = require('../models/userModel')
const Admins = require('../models/adminModel');
const { firebaserules } = require('googleapis/build/src/apis/firebaserules');

exports.create = catchAsyncErrors(async(req,res,next) => {
    
    try {
        const {title, publishedAt, abstract, departments, courses, upload, role, uploadedId, thisKey, thisAuthors} = req.body
    
    if(!title || !publishedAt || !abstract || !departments || !courses || !upload || !role || !uploadedId || !thisKey || !thisAuthors )
    return res.status(400).json({msg: "Please fill in all fields."})
    
    const titleData = await Thesis.findOne({title})
    if(titleData) return res.status(400).json({msg: "Thesis title already exists"})

    const uDept = await Department.findById(req.body.departments);
    const uCourse = await Course.findById(req.body.courses);

    const uploadedBy ={
        role: role,
        id: uploadedId
    }
    // let uploadedBy = ''

    // if(role === 'admin'){
    //     uploadedBy = await Users.findById({uploadedId});

    // }

    // if(role === 'student'){
    //     uploadedBy = await Admins.findById({uploadedId});
    // }

    const department ={ 
        departments: uDept._id,
        deptname: uDept.deptname
    }
    const course = {
        courses: uCourse._id,
        coursecode: uCourse.coursecode,
        coursename: uCourse.coursename
    }
    
    let key = req.body.thisKey
    let auth = req.body.thisAuthors
    let authors = JSON.parse(auth)
    let keywords = []
    for (let i = 0; i < key.length; i++) {
        keywords.push({

            keyword: key[i]
        })
    }
    req.body.authors = authors
    req.body.keywords = keywords
    req.body.department = department
    req.body.course = course
    req.body.uploadedBy = uploadedBy

    const thesis = await Thesis.create(req.body);

    res.status(200).json({
        success: true,
        thesis
    })
    } catch (error) {
        return res.status(500).json({msg: error.message}) 
    }
    
})


exports.getAdminThesis = catchAsyncErrors(async (req, res, next) => {

    const thesisCount = await Thesis.find().countDocuments();
    const apiFeatures = new APIFeatures(Thesis.find(), req.query).search().filter()
    
    
    let Thesis_query = await apiFeatures.query.sort({createdAt: -1});

    
    res.status(200).json({
        success: true,
        thesisCount,
        thesis:Thesis_query,
        filteredThesisCount: Thesis_query.length,
    })

})

exports.getStudentThesis = catchAsyncErrors(async (req, res, next) => {
    const user_id = req.params.id

    const theses = await Thesis.find({'uploadedBy.id': user_id});

    res.status(200).json({
        success: true,
        theses
    })

})

// /api/thesis
exports.get = catchAsyncErrors(async (req,res,next) => {
    
    const thesisCount = await Thesis.find({'status':'Active'}).countDocuments();
    const apiFeatures = new APIFeatures(Thesis.find({'status':'Active'}), req.query).search().filter()
    
    
    let Thesis_query = await apiFeatures.query;

    res.status(200).json({
        success: true,
        thesisCount,
        thesis:Thesis_query,
        filteredThesisCount: Thesis_query.length,
    })
})

// /api/thesisCount
exports.thesisCount = catchAsyncErrors(async (req,res,next) => {
    
    const thesisCount = await Thesis.find({'status':'Active'}).countDocuments();

    res.status(200).json({
        thesisCount: thesisCount
    })
})


// /api/thesis/:id
exports.find = catchAsyncErrors(async(req,res,next) => {
    const thesis = await Thesis.findById(req.params.id);
    if(!thesis) {
        return next(new ErrorHandler('Not Found',404));
    }

    var availBook
    const borrowedR = await Borrow.find({'thesis.id': req.params.id,    $nor: [ { status: 'Returned'}, { status: 'Declined' } ]  }  )
    if(borrowedR.length > 0){
        availBook = false
    }
    if(borrowedR.length === 0){
        availBook = true
    }
    
    
    res.status(200).json({
        availBook: availBook,
        borrowedR,
        thesis:thesis
    })
})

// /api/delete/thesis/:id 
exports.delete = catchAsyncErrors(async(req,res,next) =>{
    const thesis = await Thesis.findById(req.params.id);

    if(!thesis) {
    return next(new ErrorHandler('Not Found',404));
    }

    await Thesis.deleteOne();
    res.status(200).json({
    success: true,
    message: 'Deleted'
    })
})

exports.deactivate = catchAsyncErrors(async(req,res,next) =>{
    try {
        req.body.status = 'Deactivated'
        const thesis = await Thesis.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators:true,
            useFindandModify:false
        })

        res.status(200).json({
            success:true
        })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})
exports.activate = catchAsyncErrors(async(req,res,next) =>{
    try {
        req.body.status = 'Active'
        const thesis = await Thesis.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators:true,
            useFindandModify:false
        })

        res.status(200).json({
            success:true
        })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})
exports.softDelete = catchAsyncErrors(async(req,res,next) =>{
    let thesis = await Thesis.findById(req.params.id);
        if(!thesis)
        return res.status(400).json({msg: "Thesis not found"})

        try {

            thesis = await Thesis.findByIdAndUpdate(req.params.id,{'status': 'Deleted'},{
                new: true,
                runValidators:true,
                useFindandModify:false
            })

            res.status(200).json({
                success:true
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
})
exports.restoreDelete = catchAsyncErrors(async(req,res,next) =>{
    let thesis = await Thesis.findById(req.params.id);
        if(!thesis)
        return res.status(400).json({msg: "Thesis not found"})

        try {
            thesis = await Thesis.findByIdAndUpdate(req.params.id,{'status': 'Active'},{
                new: true,
                runValidators:true,
                useFindandModify:false
            })

            res.status(200).json({
                success:true
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
})



