const Thesis = require('../models/Thesis')
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');
dotenv.config({ path: 'backend/config/config.env' })
const thesis = require('../thesis_data1');
connectDatabase();

const seedThesis = async () => {
    try {
        await Thesis.deleteMany();
        console.log('Thesis are deleted');
        await Thesis.insertMany(thesis)
        console.log('All Thesis are added.')
        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

seedThesis()

