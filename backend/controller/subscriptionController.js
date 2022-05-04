const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const cloudinary = require('cloudinary')   
const Subscriptions = require('../models/subscriptionModel.js')
const Users = require('../models/userModel.js')
const Guests = require('../models/guestModel.js')
exports.create = catchAsyncErrors(async(req,res,next) => {

    try {
    const {user_id, user_role, sender_name, sender_no, reference_no, sub_type, recieptImage} = req.body
    
    if(!user_id || !user_role || !sender_name || !sender_no || !reference_no || !sub_type || !recieptImage)
        return res.status(400).json({msg: "Please fill in all fields."})

    const reference = await Subscriptions.findOne({reference_no})
    if(reference) return res.status(400).json({msg: "Reference number is invalid"})

    const subType = await Subscriptions.findOne({'user.user_id' :user_id})
    if(subType) await Subscriptions.findOneAndDelete({'user.user_id' :user_id})

    let user = {}

    if(user_role === 'student'){
        const uData = await Users.findById(user_id);

        user = {
            user_id: user_id,
            user_name: uData.user_fname + " " + uData.user_lname
        }
    }

    if(user_role === 'guest'){
        const gData = await Guests.findById(user_id);

        user = {
            user_id: user_id,
            user_name: gData.guest_fname + " " + gData.guest_lname
        }
    }



    let recieptLink = []
    let reciepts = []
    if (typeof req.body.recieptImage === 'string') {
        reciepts.push(req.body.recieptImage)
    } else {
        reciepts = req.body.recieptImage
    }
    
    for (let i = 0; i < reciepts.length; i++) {
        const result = await cloudinary.v2.uploader.upload(reciepts[i], {
            folder: 'reciepts'
        });
    
        recieptLink.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.reciept = recieptLink
    req.body.user = user


    const subscription = await Subscriptions.create(req.body);

    console.log(req.body)
    res.status(200).json({
        success: true,
        msg: "Wait for payment verification"
    })
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
    

})

exports.find = catchAsyncErrors(async(req,res,next) => {
    const user_id = req.params.id
    const subscription = await Subscriptions.find({user_id});

    if(!subscription) return res.status(200).json({msg: "No Subscriptions"})


    
    res.status(200).json({
        success: true,
        subscription

    })

})

exports.findList = catchAsyncErrors(async(req,res,next) => {
    const subscription = await Subscriptions.find();
    if(!subscription) return res.status(200).json({msg: "No Data"})
    

    console.log(subscription)
    
    res.status(200).json({
        success: true,
        subscription

    })

})

exports.delete = catchAsyncErrors(async(req,res,next) =>{
    try {
        await Subscriptions.findByIdAndDelete(req.params.id)
        res.json({msg: "Your subscription has expired", success: true})
    } catch (error) {
        return res.status(500).json({msg: err.message})
    }
})

exports.subExpire = catchAsyncErrors(async(req,res,next) =>{
    try {
        
        req.body.status = 'Expired'

        const expire = await Subscriptions.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators:true,
            useFindandModify:false
        })

        res.status(200).json({
            msg: "Your subscription has expired",
            success: true
        })
    } catch (error) {
        return res.status(500).json({msg: err.message})
    }
})
exports.verifyRequest = catchAsyncErrors(async(req,res,next) =>{
    try {
        
        req.body.status = 'Active'
        req.body.activatedAt = Date.now()

        const accept = await Subscriptions.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators:true,
            useFindandModify:false
        })

        res.status(200).json({
            msg: "Request has been verified",
            success: true
        })
    } catch (error) {
        return res.status(500).json({msg: err.message})
    }
})
exports.declineRequest = catchAsyncErrors(async(req,res,next) =>{
    try {
        
        req.body.status = 'Denied'
        req.body.activatedAt = Date.now()

        const accept = await Subscriptions.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators:true,
            useFindandModify:false
        })

        res.status(200).json({
            msg: "Request has been declined",
            success: true
        })
    } catch (error) {
        return res.status(500).json({msg: err.message})
    }
})
