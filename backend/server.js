require('dotenv').config({ path: '.env' });

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')


//middleware
const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true
}))


app.use(cors());
app.use(express.json());



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




<<<<<<< HEAD
// Routes
app.use('/api', require('./routes/thesisRouter'))
=======
// app.use('/api', require('./routes/thesisRouter'))
>>>>>>> 1076506d15eb34b91e9c483651d86c0de019396d
app.use('/api', require('./routes/departmentRouter'))
app.use('/api', require('./routes/courseRouter'))
app.use('/user', require('./routes/userRouter'))


