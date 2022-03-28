const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

const APIFeatures = require('../utils/apiFeatures')
const Department = require('../models/departmentModel')
const Course = require('../models/courseModel')
const Thesis = require('../models/thesisModel')

exports.create = catchAsyncErrors(async(req,res,next) => {
    

    const uDept = await Department.findById(req.body.departments);
    const uCourse = await Course.findById(req.body.courses);

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
    
    let keywords = []
    for (let i = 0; i < key.length; i++) {
        keywords.push({

            keyword: key[i]
        })
    }
    let authors = []
    for (let i = 0; i < auth.length; i++) {
        authors.push({
            author: auth[i]
        })
    }
    req.body.authors = authors
    req.body.keywords = keywords
    req.body.department = department
    req.body.course = course

    const thesis = await Thesis.create(req.body);

    res.status(201).json({
        success: true
    })
})


exports.getAdminThesis = catchAsyncErrors(async (req, res, next) => {

    const theses = await Thesis.find();

    res.status(200).json({
        success: true,
        theses
    })

})

// /api/thesis
exports.get = catchAsyncErrors(async (req,res,next) => {
    
    const thesisCount = await Thesis.countDocuments();
    const apiFeatures = new APIFeatures(Thesis.find(), req.query).search().filter()
    
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
    
    const thesisCount = await Thesis.countDocuments();

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
    
    res.status(200).json({
        thesis
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

