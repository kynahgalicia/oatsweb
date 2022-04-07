const catchAsyncErrors = require('../middleware/catchAsyncErrors');

const Subscriptions = require('../models/subscriptionModel.js')
exports.create = catchAsyncErrors(async(req,res,next) => {

    // const sub = await Subscriptions.findOne({user_id, sub_type})
    // if(sub_type) return res.status(400).json({msg: "You have an existing plan", mark})

    const subscription = await Subscriptions.create(req.body);

    console.log(req.body)
    res.status(200).json({
        success: true,
        msg: "Wait for payment verification",
        subscription
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

// exports.delete = catchAsyncErrors(async(req,res,next) =>{
//     try {
//         await Subscriptions.findByIdAndDelete(req.params.id)
//         res.json({msg: "Bookmark has been deleted!", success: true})
//     } catch (error) {
//         return res.status(500).json({msg: err.message})
//     }
// })
