import mongoose from "mongoose";

const mongodbClient = async () => {
  const MONGODB_URL = process.env.MONGODB_URL_DOCKER ?process.env.MONGODB_URL_DOCKER:process.env.MONGODB_Connection_String;
  
  // const MONGODB_URL = process.env.MONGODB_Connection_String
  if (!MONGODB_URL) {
    throw new Error(
      "Please define the MONGODB_URL environment variable inside .env.local"
    );
  }

  let client;
  try {
    client = await mongoose.connect(MONGODB_URL);
    console.log("db connected successfully");
    return client
  } catch (e) {
    console.log("error occurred ", e);
  }
};
mongodbClient()
export default mongodbClient