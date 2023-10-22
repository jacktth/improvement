"use server";

import mongodbClient from "@/lib/mongodb";
import Card, { ICard } from "@/models/Card";
import { HydratedDocument } from "mongoose";
import { revalidatePath } from "next/cache";

export async function addCardAction(forData: FormData) {
  const title = forData.get("title");
  const content = forData.get("content");
  const date = new Date();
  await Card.insertMany([{ title: title, content: content, date: date }]);
  revalidatePath("/note");
}

export async function getCardsAction(): Promise<HydratedDocument<ICard>[]> {
  await mongodbClient();
  const Cards: HydratedDocument<ICard>[] = await Card.find();
  // console.log(Cards);

  return Cards;
}

export async function updateCardsAction(cardId: string,formData: FormData, ) {
  await mongodbClient();

  const res = await Card.updateOne(
    { _id: cardId },
    { title: formData.get("title"), content: formData.get('content') }
  );
  console.log(res);
  revalidatePath("/note");

   return res;
}
