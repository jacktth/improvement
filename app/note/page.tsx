import CardForm from "@/components/note/CardForm";
import { ICard } from "@/models/Card";
import CardsGallery from "@/components/note/CardsGallery";
import { json } from "node:stream/consumers";
import { getCardsAction } from "./action";

export default async function Card() {
  const cards = JSON.parse(JSON.stringify(await getCardsAction())) 
  

  return (
    <div>
      <CardForm></CardForm>

      <CardsGallery {...cards}></CardsGallery>

    </div>
  );
}


