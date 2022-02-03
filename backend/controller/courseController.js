const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

const APIFeatures = require('../utils/apiFeatures')

const Course = require('../models/courseModel.js')

// /api/admin/course/new
exports.create = catchAsyncErrors(async(req,res,next) => {
    
    const course = await Course.create(req.body);

    res.status(201).json({
        success: true,
        course
    })
    })


// /api/admin/course
exports.getAdminCourse = catchAsyncErrors(async (req, res, next) => {

    const course = await Course.find();

    res.status(200).json({
        success: true,
        course
    })

})

// /api/course
exports.get = catchAsyncErrors(async (req,res,next) => {
    
    const courseCount = await Course.countDocuments();
    const apiFeatures = new APIFeatures(Course.find(), req.query).search().filter()
    
    let Course_query = await apiFeatures.query;

    res.status(200).json({
        success: true,
        courseCount,
        course:Course_query,
        filteredCourseCount: Course_query.length,
    })
})

// /api/course/:id
exports.find = catchAsyncErrors(async(req,res,next) => {
    const course = await Course.findById(req.params.id);

    if(!course) {
        return next(new ErrorHandler('Not Found',404));
    }
    
    res.status(200).json({
        success: true,
        course
    })
})

// /api/course/delete/:id 
exports.delete = catchAsyncErrors(async(req,res,next) =>{
    const course = await Course.findById(req.params.id);

    if(!course) {
    return next(new ErrorHandler('Not Found',404));
    }

    await Course.deleteOne();
    res.status(200).json({
    success: true,
    message: 'Deleted'
    })
})

