"use client";
import { ICardAfterParsed } from "@/models/Card";
import CardForm from "./CardForm";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import {
  ClassifiedCard,
  searchCardsWithInputTextAction,
} from "@/app/action";
import { Suspense, useEffect, useState } from "react";
import AddCardBar from "./AddCardBar";

function CardsGallery(classifiedCards: ClassifiedCard) {
  const [searchedCard, setsearchedCard] = useState<ICardAfterParsed[]>([]);
  const noPinnedCards = classifiedCards.noPinnedCards;
  const PinnedCards = classifiedCards.PinnedCards;
  const listView: boolean = useSelector(
    (state: RootState) => state.note.listView
  );
  // const searchedCard: ICardAfterParsed[] = useSelector(
  //   (state: RootState) => state.note.textSearchedCards
  // );
  // const searchText = useSelector((state: RootState) => state.note.searchText);

  // useEffect(() => {
  //   async function setResNote() {
  //     if (searchText === "") {
  //       setsearchedCard([]);
  //     } else {
  //       const res = await searchCardsWithInputTextAction(searchText);
  //       const parsedObjectRes = Object.values<ICardAfterParsed>(
  //         JSON.parse(await JSON.stringify(res))
  //       );
  //       setsearchedCard(parsedObjectRes);
  //     }
  //   }
  //   setResNote();
  //   console.log("search word", searchText);
  // }, [searchText]);

  const displayedCards = searchedCard.length > 0 ? searchedCard : noPinnedCards;

  const NormalDisplayedCards = () => {
    const displayCssParam = listView
      ? "grid w-[90%] grid-cols-1 grid-rows-1  justify-center items-center "
      : "grid  gap-4 justify-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
    return (
      <div className="w-full h-[99.9999%] overflow-auto">
        {PinnedCards.length > 0 ? (
          <>
            <div className="flex h-28 w-full items-center justify-center  ">
              <AddCardBar></AddCardBar>
            </div>
            <span className="text-darkInactiveIcon  ">PINNED</span>

            <div className={`${displayCssParam}`}>
              {PinnedCards.map((cardInfo: ICardAfterParsed, i) => (
                <div className="row-span-1 col-span-1 mb-2" key={cardInfo._id}>
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
            <div className=" mt-24">
              <span className="text-darkInactiveIcon">OTHERS</span>
              <div className={`${displayCssParam}`}>
                {noPinnedCards ? (
                  displayedCards.map((cardInfo: ICardAfterParsed, i) => (
                    <div className="mb-2" key={cardInfo._id}>
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
            <div className={`${displayCssParam}`}>
              {noPinnedCards ? (
                displayedCards.map((cardInfo: ICardAfterParsed, i) => (
                  <div className="mb-2" key={cardInfo._id}>
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
      </div>
    );
  };
  const SearchedNotes = () => {
    return (
      <>
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
      {/* {searchText.length === 0 && searchedCard.length === 0 ? (
        <NormalDisplayedCards />
      ) : (
        <Suspense fallback={<p className="text-white h-36">Loading feed...</p>}>
          <SearchedNotes />
        </Suspense>
      )} */}
      <NormalDisplayedCards />
    </>
  );
}

export default CardsGallery;
