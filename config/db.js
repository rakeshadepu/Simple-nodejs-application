//mongodb library
const mongoose = require("mongoose");

//Database connection code
const connectDB = async () => {
  //try catch block for catching errors efficiently
  try {
    //Actual connection
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Database Connected to ${mongoose.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
//exporting module to use in another file
module.exports = connectDB;
