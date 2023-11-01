"use client";
import { ICardAfterParsed } from "@/models/Card";
import CardForm from "./CardForm";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { ClassifiedCard, getCardsAction } from "@/app/note/action";

function CardsGallery(classifiedCards: ClassifiedCard) {
  const noPinnedCards = classifiedCards.noPinnedCards;
  const PinnedCards = classifiedCards.PinnedCards;
  const searchedCard: ICardAfterParsed[] = useSelector(
    (state: RootState) => state.note.textSearchedCards
  );
  const displayedCards = searchedCard.length > 0 ? searchedCard : noPinnedCards;

  const NormalDisplayedCards = () => {
    return (
      <>
        {PinnedCards.length > 0 ? (
          <div className="mb-10">
            <span className="text-darkInactiveIcon">PINNED</span>

            <div className="grid grid-cols-4 gap-1 ">
              {PinnedCards.map((cardInfo: ICardAfterParsed, i) => (
                <div key={cardInfo._id}>
                  <CardForm
                    content={cardInfo.content}
                    title={cardInfo.title}
                    cardId={cardInfo._id}
                    index={i}
                    pinned={cardInfo.pinned}
                    editedDate={cardInfo.editedDate.toString()}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <></>
        )}


        <div>
          <span className="text-darkInactiveIcon">OTHERS</span>
          <div className="grid grid-cols-4 gap-4">
            {noPinnedCards ? (
              displayedCards.map((cardInfo: ICardAfterParsed, i) => (
                <div key={cardInfo._id}>
                  <CardForm
                    content={cardInfo.content}
                    title={cardInfo.title}
                    cardId={cardInfo._id}
                    index={i}
                    pinned={cardInfo.pinned}
                    editedDate={cardInfo.editedDate.toString()}
                  />
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <NormalDisplayedCards />
    </>
  );
}

export default CardsGallery;
