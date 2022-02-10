const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

const APIFeatures = require('../utils/apiFeatures')

const Course = require('../models/courseModel.js')
const Department = require('../models/departmentModel.js')

// /api/admin/course/new
exports.create = catchAsyncErrors(async(req,res,next) => {

    const cdept = await Department.findById(req.body.departments);


    req.body.department = {
        id: cdept._id,
        deptname: cdept.deptname
    }
    
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
    const apiFeatures = new APIFeatures(Course.find(), req.query).searchCourse().filter()
    console.log(req.query)
    
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

// api/admin/department/edit
exports.editCourse = catchAsyncErrors(async(req,res,next) => {
    let course = await Course.findById(req.params.id);

    if(!Course) {
        return next(new ErrorHandler('Course not found',404));
    }

    try{
        course = await Course.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators:true,
            useFindandModify:false
        })

        res.status(200).json({
            success:true,
            course
        })
    }catch(error){
        res.status(500).send(error.message);
        console.log(error.message);
    }
})

// /api/course/delete/:id 
exports.delete = catchAsyncErrors(async(req,res,next) =>{
    try {
        await Course.findByIdAndDelete(req.params.id)
        res.json({msg: "Course has been deleted!", success: true})
    } catch (error) {
        return res.status(500).json({msg: err.message})
    }
})

