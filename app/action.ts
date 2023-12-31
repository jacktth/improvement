"use server";

import mongodbClient from "@/lib/mongodb";
import Card, { ICard, ICardAfterParsed } from "@/models/Card";
import { HydratedDocument } from "mongoose";
import { revalidatePath } from "next/cache";

// export async function addCardAction(pinned: boolean, forData: FormData) {
//   try {
//     await mongodbClient();
//     console.log("start");
    
//     const title = forData.get("title")?.toString();
//     const content = forData.get("content")?.toString();
//     const date = new Date();
//     if (title!==undefined && content!==undefined) {
//       const cardDetail: ICard = {
//         title: title,
//         content: content,
//         date: date,
//         editedDate: date,
//         pinned: pinned,
//         label: [],
//       };
//       await Card.create<ICard>(cardDetail);
//       revalidatePath("/note");
//     }
//   } catch (error) {
//     console.log(error);
    
//   }

// }
export async function addCardAction(pinned: boolean, content:string,title:string) {
  try {
    await mongodbClient();
    console.log("start adding");
    

    const date = new Date();
    if (title!==undefined && content!==undefined) {
      const cardDetail: ICard = {
        title: title,
        content: content,
        date: date,
        editedDate: date,
        pinned: pinned,
        label: [],
      };
      await Card.create<ICard>(cardDetail);
      revalidatePath("/");
    }
  } catch (error) {
    console.log(error);
    
  }

}
export type ClassifiedCard= {
  noPinnedCards:ICardAfterParsed[]
  PinnedCards:ICardAfterParsed[]
}
export async function getCardsAction(): Promise<ClassifiedCard> {
  await mongodbClient();
  const Cards: HydratedDocument<ICard>[] = await Card.find();

  const parsedCards: ICardAfterParsed[] = Cards.map((card) => {
    return { ...card.toJSON(), _id: card._id.toString(),__v:card.__v };
  });

  const noPinnedCards = parsedCards.filter(card =>card.pinned===false);
  const PinnedCards = parsedCards.filter(card =>card.pinned===true);
  const resCardTypes = {
    noPinnedCards:noPinnedCards,PinnedCards:PinnedCards
  }
  return resCardTypes;
}

// export async function updateCardsAction(cardId: string, formData: FormData) {
//   await mongodbClient();
//   const now = new Date();
  
//   const res = await Card.updateOne<ICard>(
//     { _id: cardId },
//     { title: formData.get("title"), content: formData.get("content"),editedDate:now }
//   );
//   console.log(res);
//   revalidatePath("/note");

//   return res;
// }
export async function updateCardsAction(cardId: string,title:string, content:string,) {
  await mongodbClient();
  const now = new Date();
  console.log(now);
  
  const res = await Card.updateOne<ICard>(
    { _id: cardId },
    { title:title, content: content,editedDate:now }
  );
  console.log("updated",res);

  return res;
}

export async function pinCardsAction(cardId: string) {
  await mongodbClient();

  const res = await Card.updateOne({ _id: cardId }, { pinned: true });
  console.log("UnPinCardsAction",res);

  revalidatePath("/");
}

export async function unPinCardsAction(cardId: string) {
  await mongodbClient();

  const res = await Card.updateOne({ _id: cardId }, { pinned: false });
  console.log("UnPinCardsAction",res);
  
  revalidatePath("/");
}

export async function searchCardsWithInputTextAction(searchText:string) {
  await mongodbClient();
  // const text = formData.get("text")?.toString();
  const text = searchText
  if (text !== undefined && text !== null) {
    const res = await Card.aggregate<HydratedDocument<ICard>>([
      {
        $match: {
          $or: [
            { content: { $regex: text, $options: "i" } },
            { title: { $regex: text, $options: "i" } },
          ],
        },
      },
    ]);
    const parsedRes: ICardAfterParsed[] = res.map((card) => {
      return { ...card, _id: card._id.toString(),__v:card.__v };
    });
    console.log(parsedRes);
    // revalidatePath("/searchedNotes/"+searchText);
    return parsedRes;
  }
}
