const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

const APIFeatures = require('../utils/apiFeatures')

const Department = require('../models/departmentModel.js')
const Course = require('../models/courseModel.js')

// /api/admin/department/new
exports.create = catchAsyncErrors(async(req,res,next) => {
    console.log(req.body);
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
    
    const departmentCount = await Department.countDocuments({'status':'Active'});
    const Department_query = await Department.find({'status':'Active'})
    
    res.status(200).json({
        success: true,
        departmentCount,
        department:Department_query,
        filteredDepartmentCount: Department_query.length,
    })
})
// /api/department/deleted
exports.getDeleted = catchAsyncErrors(async (req,res,next) => {
    
    const departmentCount = await Department.countDocuments({'status':'Deleted'});
    const apiFeatures = new APIFeatures(Department.find({'status':'Deleted'}), req.query).search().filter()
    
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

// api/admin/department/edit
exports.editDepartment = catchAsyncErrors(async(req,res,next) => {
    let department = await Department.findById(req.params.id);

    if(!Department) {
        return next(new ErrorHandler('Department not found',404));
    }

    try{
        department = await Department.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators:true,
            useFindandModify:false
        })

        res.status(200).json({
            success:true,
            department
        })
    }catch(error){
        res.status(500).send(error.message);
        console.log(error.message);
    }
})

// /api/department/permanent/delete/:id 
exports.delete = catchAsyncErrors(async(req,res,next) =>{
    try {

        await Department.findByIdAndDelete(req.params.id)
        
        const deptCourse = await Course.find({'department.id': req.params.id})


        let deleteCourse = []
        
        for (let i = 0; i < deptCourse.length; i++) {
            deleteCourse.push(
    
                deptCourse[i]._id
            )
        }

        await Course.deleteMany({_id: { $in: deleteCourse}})

        res.json({msg: "Department has been deleted!", success: true})
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
})
// /api/department/delete/:id 
exports.softdelete = catchAsyncErrors(async(req,res,next) =>{
    try {
        const dept = await Department.findByIdAndUpdate(req.params.id,{'status': 'Deleted'},{
            new: true,
            runValidators:true,
            useFindandModify:false
        })

        const deptCourse = await Course.updateMany({'department.id' : req.params.id}, { $set: {status: 'Deleted', 'department.status': 'Deleted' }});

        res.json({msg: "Department (and Courses under it) has been Deleted!", success: true})
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
})
// /api/department/restore/:id 
exports.restoredelete = catchAsyncErrors(async(req,res,next) =>{
    try {
        const dept = await Department.findByIdAndUpdate(req.params.id,{'status': 'Active'},{
            new: true,
            runValidators:true,
            useFindandModify:false
        })

        const deptCourse = await Course.updateMany({'department.id' : req.params.id}, { $set: {status: 'Active', 'department.status': 'Active' }});

        res.json({msg: "Department (and Courses under it) has been restored!", success: true})
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
})

