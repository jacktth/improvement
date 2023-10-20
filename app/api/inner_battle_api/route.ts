import mongodbClient from "@/lib/mongodb";
import People from "@/models/People";
import { log } from "console";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";


export async function GET() {

  try {
    await mongodbClient()

    const peopleData = await People.find();
    
    console.log(peopleData);

    return NextResponse.json(peopleData);
  } catch (e) {
    console.log("error occurred ", e);
  }
}

export async function POST(req: Request) {
  try {
    await mongodbClient()
    const body = Object.fromEntries((await req.formData()).entries())
    console.log("body",body);
    const peopleData = await People.insertMany(body);
    
    console.log(peopleData);

    return NextResponse.json(peopleData);
  } catch (e) {
    console.log("error occurred ", e);
  }
}