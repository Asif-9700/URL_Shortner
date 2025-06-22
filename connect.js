// const mongoose=require('mongoose');

// async function connectToMongoDB(url){
//     return mongoose.connect(url);
// }

// module.exports={
//     connectToMongoDB,
// }
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

async function connectToMongoDB() {
  const url = process.env.MONGO_URI;
  try {
    await mongoose.connect(url);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

module.exports = {
  connectToMongoDB,
};
