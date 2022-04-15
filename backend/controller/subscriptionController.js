const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const cloudinary = require('cloudinary')   
const Subscriptions = require('../models/subscriptionModel.js')
exports.create = catchAsyncErrors(async(req,res,next) => {

    const {user_id, sender_name, sender_no, reference_no, sub_type, recieptImage} = req.body
    
    if(!user_id || !sender_name || !sender_no || !reference_no || !sub_type || !recieptImage)
        return res.status(400).json({msg: "Please fill in all fields."})

    const subType = await Subscriptions.findOne({user_id})
    if(subType) return res.status(400).json({msg: "You have an existing plan"})

    const reference = await Subscriptions.findOne({reference_no})
    if(reference) return res.status(400).json({msg: "Reference number is invalid"})

    const subscription = await Subscriptions.create(req.body);

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


    console.log(req.body)
    res.status(200).json({
        success: true,
        msg: "Wait for payment verification"
    })

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

exports.delete = catchAsyncErrors(async(req,res,next) =>{
    try {
        await Subscriptions.findByIdAndDelete(req.params.id)
        res.json({msg: "Your subscription has expired", success: true})
    } catch (error) {
        return res.status(500).json({msg: err.message})
    }
})
