"use server";

import mongodbClient from "@/lib/mongodb";
import Card, { ICard, ICardAfterParsed } from "@/models/Card";
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

export async function updateCardsAction(cardId: string, formData: FormData) {
  await mongodbClient();

  const res = await Card.updateOne(
    { _id: cardId },
    { title: formData.get("title"), content: formData.get("content") }
  );
  console.log(res);
  revalidatePath("/note");

  return res;
}

export async function searchCardsWithInputTextACtion(formData: FormData) {
  await mongodbClient();
  const text = formData.get("text")?.toString();
  if (text !== undefined && text !== null) {
    const res = await Card.aggregate<ICard>([
      {
        $match: {
          $or: [
            { content: { $regex: text, $options: "i" } },
            { title: { $regex: text, $options: "i" } },
          ],
        },
      }
    ]);
    const parsedRes:ICardAfterParsed[] = res.map((card)=>{
      return {...card,_id:card._id.toString()}
    })
    console.log(parsedRes);
    revalidatePath("/note");
    return parsedRes;
  }
}
