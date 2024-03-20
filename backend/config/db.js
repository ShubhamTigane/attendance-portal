import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
  //  console.log(`Connected to mongoDB ${conn.connection.host} `);
  } catch (error) {
//console.log(`Error in mongoDB ${error} `);
  }
};

export default connectDB;
