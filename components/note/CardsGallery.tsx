"use client";
import { ICardAfterParsed } from "@/models/Card";
import CardForm from "./CardForm";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import {
  ClassifiedCard,
  searchCardsWithInputTextAction,
} from "@/app/note/action";
import { useEffect, useState } from "react";

function CardsGallery(classifiedCards: ClassifiedCard) {
  const [searchedCard, setsearchedCard] = useState<ICardAfterParsed[]>([]);
  const noPinnedCards = classifiedCards.noPinnedCards;
  const PinnedCards = classifiedCards.PinnedCards;
  // const searchedCard: ICardAfterParsed[] = useSelector(
  //   (state: RootState) => state.note.textSearchedCards
  // );
  const searchText = useSelector((state: RootState) => state.note.searchText);

  useEffect(() => {
    async function setResNote() {
      if (searchText === "") {
        setsearchedCard([]);
      } else {
        const res = await searchCardsWithInputTextAction(searchText);
        const parsedObjectRes = Object.values<ICardAfterParsed>(
          JSON.parse(await JSON.stringify(res))
        );
        setsearchedCard(parsedObjectRes);
      }
    }
    setResNote();
    console.log("search word", searchText);
  }, [searchText]);

  const displayedCards = searchedCard.length > 0 ? searchedCard : noPinnedCards;

  const NormalDisplayedCards = () => {
    return (
      <>
        {PinnedCards.length > 0 ? (
          <>
            <div className="h-auto">
              <span className="text-darkInactiveIcon">PINNED</span>

              <div className="grid grid-cols-4 gap-4 ">
                {PinnedCards.map((cardInfo: ICardAfterParsed, i) => (
                  <div className="h-fit" key={cardInfo._id}>
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
            <div className="h-auto mt-24">
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
        ) : (
          <>
            {" "}
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
          </>
        )}
      </>
    );
  };
  const SearchedNotes = () => {
    return (
      <>
        <>
          {" "}
          <div className="text-slate-50">dsadadasdadsadasdasdadasss</div>
        </>
        <div className="grid grid-cols-4 gap-4 ">
          {searchedCard.map((cardInfo: ICardAfterParsed, i) => (
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
      </>
    );
  };
  return (
    <>
      {searchedCard.length === 0 ? <NormalDisplayedCards /> : <SearchedNotes />}
    </>
  );
}

export default CardsGallery;
