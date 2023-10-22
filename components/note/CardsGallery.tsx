"use client";

import { ICard } from "@/models/Card";
import { HydratedDocument } from "mongoose";
import CardForm from "./CardForm";

function CardsGallery(cards: HydratedDocument<ICard>) {
  const cardsArray: HydratedDocument<ICard>[] = Object.values(cards);

  return (
    <div className="grid grid-cols-4 gap-4">
      {cards ? (
        cardsArray.map((cardInfo: HydratedDocument<ICard>, i) => (
          <div key={cardInfo._id.toString()}>
            <CardForm
              content={cardInfo.content}
              title={cardInfo.title}
              id={cardInfo._id.toString()}
              index={i}
            />
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
}

export default CardsGallery;
