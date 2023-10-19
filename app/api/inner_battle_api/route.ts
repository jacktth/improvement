import mongodbClient from "@/lib/mongodb";
import People from "@/models/People";
import { NextResponse } from "next/server";

export async function GET() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  try {
    await mongodbClient()

    const peopleData = await People.find({name:"alex"});
    
    console.log(peopleData);

    return NextResponse.json(peopleData);
  } catch (e) {
    console.log("error occurred ", e);
  }
}
