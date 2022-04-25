const Thesis = require('../models/thesisModel')
const Course = require('../models/courseModel')
const Department = require('../models/departmentModel')
const ViewLog = require('../models/viewLogModel')
const DownloadLog = require('../models/downloadLogModel')
require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose')
// const connectDatabase = require('../config/database');
const thesis = require('../thesis_data1');
const course = require('../course_data');
const department = require('../department_data');
const uri = process.env.DB_LOCAL_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', ()=> {
    console.log("MongoDB connection is OK");
});


const seedThesis = async () => {
    try {
        // await Thesis.deleteMany();
        // await ViewLog.deleteMany();
        await DownloadLog.deleteMany();
        // await Course.deleteMany();
        // await Department.deleteMany();
        // console.log('Thesis / Course Are Deleted');
        // await Thesis.insertMany(thesis)
        // await Course.insertMany(course)
        // await Department.insertMany(department)
        // console.log('Data Added.')
        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

seedThesis()

