const Thesis = require('../models/thesisModel')
const Course = require('../models/courseModel')
const Department = require('../models/departmentModel')
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');
dotenv.config({ path: 'backend/config/config.env' })
const thesis = require('../thesis_data1');
const course = require('../course_data');
const department = require('../department_data');
connectDatabase();

const seedThesis = async () => {
    try {
        await Thesis.deleteMany();
        await Course.deleteMany();
        await Department.deleteMany();
        console.log('Thesis / Course Are Deleted');
        // await Thesis.insertMany(thesis)
        await Course.insertMany(course)
        await Department.insertMany(department)
        console.log('Data Added.')
        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

seedThesis()

