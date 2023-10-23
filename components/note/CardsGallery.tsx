"use client";
import { ICard, ICardAfterParsed } from "@/models/Card";
import { HydratedDocument } from "mongoose";
import CardForm from "./CardForm";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

function CardsGallery(cards: HydratedDocument<ICard>) {
  const cardsArray: HydratedDocument<ICard>[] = Object.values(cards);
  const searchedCard = useSelector(
    (state: RootState) => state.note.textSearchedCards
  );
  const SearchedCards = () => {
    return (
      <div>
        {cards ? (
          searchedCard.map((cardInfo: ICardAfterParsed, i) => (
            <div className="grid grid-cols-4 gap-4" key={cardInfo._id}>
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
  };
  const AllCards = () => {
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
  };
  return <>{searchedCard.length > 0 ? <SearchedCards /> : <AllCards />}</>;
}

export default CardsGallery;
