const Borrow = require('../models/borrowModel');
const Users = require('../models/userModel')
const Admins = require('../models/adminModel')
const Thesis = require('../models/thesisModel')

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

        const borrowed = await Borrow.findOne({user, thesis})
        if(borrowed) return res.status(400).json({msg: "Already Borrowed"})

        const borrow = await Borrow.create(req.body);

        res.status(201).json({
            success: true
        })
    }catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

// get All Borrowed
exports.get = async (req, res, next) => {

    const borrow = await Borrow.find();

    res.status(200).json({
        success: true,
        borrow
    })

}

// api/admin/Borrow/edit
exports.edit = async(req,res,next) => {
    let borrow = await Borrow.findById(req.params.id);

    // if(!borrow) {
    //     return next(new ErrorHandler('Not Found',404));
    // }
    
    try{
        borrow = await Borrow.findByIdAndUpdate(req.params.id,req.body,{
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