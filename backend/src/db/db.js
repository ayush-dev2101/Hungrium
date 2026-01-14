/*  const mongoose = require('mongoose');

function connectDB(){
  mongoose.connect("process.env.MONGODB_URI").then(()=>{
    console.log("MongoDB Connected");
  })
  .catch((error)=>{
    console.log("MongoDB connection error:", error) //error parameter checks the error during run time
  })
}

module.exports = connectDB; */



const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // console.log("Mongo URI value →", process.env.MONGODB_URI);

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports = connectDB;
