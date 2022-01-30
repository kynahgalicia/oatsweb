const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const guestSchema = new mongoose.Schema({
    gfname:{type: String, required: true, minlength: 2, maxlength: 30 },
    glname:{type: String, required: true, minlength: 2, maxlength: 30 },
    gcontact:{type: Number, required: true, minlength:11, maxlength: 11},
    gprofession:{type: String, required: true, minlength:6},
    gcompany:{type: String, required: true, minlength:6},
    gcompanyadd:{type: String, required: true, minlength:6},
    gemail: {type: String, required: true, unique: true, minlength:10, maxlength:30},
    gpassword: {type: String, required:true, minlength:6},
    avatar: [{
        public_id: {type: String,required: true},
        url: {type: String,required: true},
    }],
    createdAt: {type: Date, default: Date.now},
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

// Encrypting password before saving user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// Return JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

// Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    // Set token expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

    return resetToken

}

module.exports = mongoose.model('Guest', guestSchema);