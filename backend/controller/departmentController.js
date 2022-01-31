const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

const APIFeatures = require('../utils/apiFeatures')

const Department = require('../models/departmentModel.js')

// /api/admin/department/new
exports.create = catchAsyncErrors(async(req,res,next) => {
    
    const department = await Department.create(req.body);

    res.status(201).json({
        success: true,
        department
    })
    })


// /api/admin/department
exports.getAdminDepartment = catchAsyncErrors(async (req, res, next) => {

    const department = await Department.find();

    res.status(200).json({
        success: true,
        department
    })

})

// /api/department
exports.get = catchAsyncErrors(async (req,res,next) => {
    
    const departmentCount = await Department.countDocuments();
    const apiFeatures = new APIFeatures(Department.find(), req.query).search().filter()
    
    let Department_query = await apiFeatures.query;

    res.status(200).json({
        success: true,
        departmentCount,
        department:Department_query,
        filteredDepartmentCount: Department_query.length,
    })
})

// /api/department/:id
exports.find = catchAsyncErrors(async(req,res,next) => {
    const department = await Department.findById(req.params.id);

    if(!department) {
        return next(new ErrorHandler('Not Found',404));
    }
    
    res.status(200).json({
        success: true,
        department
    })
})

// /api/department/delete/:id 
exports.delete = catchAsyncErrors(async(req,res,next) =>{
    const department = await Department.findById(req.params.id);

    if(!department) {
    return next(new ErrorHandler('Not Found',404));
    }

    await Department.deleteOne();
    res.status(200).json({
    success: true,
    message: 'Deleted'
    })
})

