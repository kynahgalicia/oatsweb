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

exports.createMobile = catchAsyncErrors(async(req,res,next) => {

    console.log(req.body);

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


    req.body.reciept = recieptImage
    req.body.user = user


    const subscription = await Subscriptions.create(req.body);

    // console.log(req.body)
    res.status(200).json({
        success: true,
        msg: "Wait for payment verification"
    })
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
    

})

exports.find = catchAsyncErrors(async(req,res,next) => {
    

    const subscription = await Subscriptions.findOne({ "user.user_id": req.params.id});

    if(!subscription) return res.status(200).json({msg: "No Subscriptions", success: false})


    
    res.status(200).json({
        success: true,
        subscription

    })

})

exports.findList = catchAsyncErrors(async(req,res,next) => {

    try {
        const subscription = await Subscriptions.find();
        if(!subscription) return res.status(200).json({msg: "No Data"})
        
        let expired = []
        for (let i = 0; i < subscription.length; i++) {
    
            if(subscription[i].status === 'Active'){
                // console.log(subscription[i]._id);
                // const date1 = new Date('5/12/2022');
                const date1 = subscription[i].activatedAt;
                const date2 = Date.now();
                const diffTime = Math.abs(date2 - date1);
                const diffHours = Math.ceil(diffTime / (1000 * 60 * 60)); 
    
                if(subscription[i].sub_type === 'oneDay' && diffHours >= 24 ){
                    expired.push(subscription[i]._id)
                }
                if(subscription[i].sub_type === 'weekly' && diffHours >= 168 ){
                    expired.push(subscription[i]._id)
                }
            }
    
        }

        if(expired){
            await Subscriptions.updateMany({_id :{ $in:expired } }, { $set: {status: 'Expired' }});
        }

    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
    


    try {
        const subs = await Subscriptions.find();

        res.status(200).json({
            success: true,
            subscription: subs
        })
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
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
        return res.status(500).json({msg: error.message})
    }
})

exports.subExpireAdmin = catchAsyncErrors(async(req,res,next) =>{
    try {
        const {expiredSubs} = req.body
        

        res.status(200).json({
            msg: "Subscriptions has expired",
            success: true
        })
    } catch (error) {
        return res.status(500).json({msg: error.message})
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
