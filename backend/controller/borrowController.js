const Borrow = require('../models/borrowModel');
const Users = require('../models/userModel')
const Admins = require('../models/adminModel')
const Thesis = require('../models/thesisModel')

const catchAsyncErrors = require('../middleware/catchAsyncErrors');
// const { clearErrors } = require('../../frontend/src/redux/actions/borrowActions');

// Create Borrower 
exports.create = async(req,res,next) => {
    try{

        const user_tupid = req.body.user
        const cusers = await Users.findOne({user_tupid})

        req.body.user = {
            id: cusers._id,
            tupid: cusers.user_tupid,
            fname: cusers.user_fname,
            lname: cusers.user_lname
        }

        const cadmins = await Admins.findById(req.body.admins)

        req.body.admin={
            id: cadmins._id,
            tupid:cadmins.admin_tupid,
            fname:cadmins.admin_fname,
            lname:cadmins.admin_lname
        }

        const title = req.body.theses
        const cthesis = await Thesis.findOne({title})
        
        req.body.thesis = {
            id: cthesis._id,
            title: cthesis.title
        }

        const {user, thesis, admin, dateBorrowed,dueDate} = req.body

       

        const borrow = await Borrow.create(req.body);

        res.status(201).json({
            borrowed,
            success: true
        })
    }catch (err) {
        return res.status(500).json({msg: err.message})
    }
}
exports.studentRequest = async(req,res,next) => {
    try{
        const user_tupid = req.body.user
        const cusers = await Users.findOne({user_tupid})

        
        req.body.user = {
            id: cusers._id,
            tupid: cusers.user_tupid,
            fname: cusers.user_fname,
            lname: cusers.user_lname
        }
        
        const title = req.body.theses
        const cthesis = await Thesis.findById({'_id': title})
        if(!cthesis) return res.status(400).json({msg: "Thesis not found"})
        
        req.body.thesis = {
            id: cthesis._id,
            title: cthesis.title,
            department:cthesis.department.deptname
        }

        console.log(cthesis)
        console.log(cusers)
        
        const {user, thesis} = req.body
        
        
        const borrowed = await Borrow.findOne({user, thesis, 'status': 'Pending'})
        if(borrowed) return res.status(400).json({msg: "Already Requested"})
        
        const borrowedB = await Borrow.findOne({user, thesis, 'status': 'Active'})
        if(borrowedB) return res.status(401).json({msg: "Already Borrowed"})

        // const borrowUnreturned = await Borrow.find({ "thesis.title": req.body.theses , 'status': { $not:/Returned/}})
        // if(borrowUnreturned.length > 0) return res.status(400).json({msg: "Book is Unavailable"})
        
        const limit = await Borrow.find({'user.tupid': user_tupid, 'status': { $not:/Returned/}}).countDocuments()
        if(limit >= 3) return res.status(402).json({msg: "Reached Limit of Borrow"})
        
        const borrow = await Borrow.create(req.body);

        res.status(201).json({
            success: true,
            msg: "Your borrow request has been sent!"
        })
    }catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

// get All Borrowed
exports.get = async (req, res, next) => {

    const borrow = await Borrow.find();

    let overdue = []
    for (let x = 0; x < borrow.length; x++) {

        if (borrow[x].status === 'Active') {
            const date1 = borrow[x].dueDate
            const date2 = Date.now();
            console.log(date1 +'-'+ date2)
            if(date1 < date2){
                overdue.push(borrow[x]._id)
            }
        }
        
    }

    if(overdue){
        await Borrow.updateMany({_id :{ $in:overdue } }, { $set: {status: 'Overdue' }});
    }

    const borrow2 = await Borrow.find();

    res.status(200).json({
        success: true,
        borrow: borrow2
    })

}

exports.getStudent = async (req, res, next) => {

    const user_tupid = req.params.user
    const borrow = await Borrow.find({'user.tupid': user_tupid});

    let overdue = []
    for (let x = 0; x < borrow.length; x++) {

        if (borrow[x].status === 'Active') {
            const date1 = borrow[x].dueDate;
            const date2 = Date.now();
            
            if(date1 < date2){
                overdue.push(borrow[x]._id)
            }
        }
        
    }

    if(overdue){
        await Borrow.updateMany({_id :{ $in:overdue } }, { $set: {status: 'Overdue' }});
    }

    const borrow2 = await Borrow.find({'user.tupid': user_tupid});
    res.status(200).json({
        success: true,
        borrow: borrow2
    })

}

// api/admin/Borrow/edit
exports.edit = async(req,res,next) => {
    
    try{
        req.body.status = 'Returned'
        const borrow = await Borrow.findByIdAndUpdate(req.body.id,req.body,{
            new: true,
            runValidators:true,
            useFindandModify:false
        })

        res.status(200).json({
            success:true,
            borrow
        })
        
    }catch(error){
        res.status(500).send(error.message);
        console.log(error.message);
    }
}

// /api/course/delete/:id 
exports.delete = catchAsyncErrors(async(req,res,next) =>{
    try {
        await Borrow.findByIdAndDelete(req.params.id)
        res.json({msg: "Borrow Request has been deleted!", success: true})
    } catch (error) {
        return res.status(500).json({msg: err.message})
    }
})

exports.verifyRequest = catchAsyncErrors(async(req,res,next) =>{
    try {
        
        req.body.status = 'Active'
        req.body.dateBorrowed = Date.now()

        const {dueDate} = req.body

        const cadmins = await Admins.findById(req.body.admins)
        
        req.body.admin={
            id: cadmins._id,
            tupid:cadmins.admin_tupid,
            fname:cadmins.admin_fname,
            lname:cadmins.admin_lname
        }

        const borrowUnreturned = await Borrow.find({ "thesis.title": req.body.title , 'status': { $not:/Returned/}})
        if(borrowUnreturned.length > 0) return res.status(400).json({msg: "Book is Unavailable"})
        
        
        if(!dueDate) return res.status(400).json({msg: "Please enter due date and time"})


        const accept = await Borrow.findByIdAndUpdate(req.body.id,req.body,{
            new: true,
            runValidators:true,
            useFindandModify:false
        })

        res.status(200).json({
            msg: "Request has been verified",
            success: true
        })
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
})
exports.declineRequest = catchAsyncErrors(async(req,res,next) =>{
    try {
        
        req.body.status = 'Denied'


        const accept = await Borrow.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators:true,
            useFindandModify:false
        })

        res.status(200).json({
            msg: "Request has been declined",
            success: true
        })
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
})
exports.returnBorrow = catchAsyncErrors(async(req,res,next) =>{
    try {
        
        req.body.status = 'Returned'

        const accept = await Borrow.findByIdAndUpdate(req.body.id,req.body,{
            new: true,
            runValidators:true,
            useFindandModify:false
        })

        res.status(200).json({
            msg: "Request has been declined",
            success: true
        })
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
})