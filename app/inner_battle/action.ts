"use server"

import mongodbClient from "@/lib/mongodb";
import Card, { ICard } from "@/models/Card";
import { revalidatePath } from "next/cache";
export async function addCard(forData:FormData) {
    const title = forData.get("title")
    const content = forData.get("content")
    const date = new Date()
    await Card.insertMany([{title:title,content:content,date:date}]);
    revalidatePath("/inner_battle")
}

export async function getCards() {
    await mongodbClient();
    const Cards: ICard[] = await Card.find();
    return Cards
}