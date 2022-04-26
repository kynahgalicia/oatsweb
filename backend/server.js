require('dotenv').config({ path: '.env' });
const cloudinary =  require('cloudinary')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')


//middleware
const app = express()
app.use(express.json({limit: '50mb'}))
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true
}))


app.use(cors());
app.use(express.json());

// Setting up cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


//mongodb connection 
const uri = process.env.DB_LOCAL_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', ()=> {
    console.log("MongoDB connection is OK");
});



//port
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('SERVER IS RUNNING ON PORT', PORT)
})




// Routes
app.use('/api', require('./routes/thesisRouter'))
app.use('/api', require('./routes/departmentRouter'))
app.use('/api', require('./routes/courseRouter'))
app.use('/api', require('./routes/borrowRouter'))
app.use('/user', require('./routes/userRouter'))
app.use('/admin', require('./routes/adminRouter'))
app.use('/guest', require('./routes/guestRouter'))
app.use('/api', require('./routes/bookmarkRouter'))
app.use('/api', require('./routes/loggingRouter'))
app.use('/api', require('./routes/subscriptionRouter'))


