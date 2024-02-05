const mongoose = require('mongoose');
const DB_NAME = "registry";
require('dotenv').config();

const connectDB = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)

        console.log(`\nMongoDB is connected to DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("Mongoose Connection Error", error);
    }
}

module.exports = connectDB;