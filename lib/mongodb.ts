import mongoose from "mongoose";

const mongodbClient = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  let client;
  try {
    client = await mongoose.connect(MONGODB_URI);
    console.log("db connected successfully");
    return client
  } catch (e) {
    console.log("error occurred ", e);
  }
};
mongodbClient()
export default mongodbClient