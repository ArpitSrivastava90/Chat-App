import mongoose from "mongoose";
export const connectDb = async () => {
  try {
    const connectDb = await mongoose.connect(process.env.MONGO_URL);
    console.log("DataBase Connected", connectDb.connection.host);
  } catch (error) {
    console.error("Error Connecting to database", error);
    process.exit(1);
  }
};
