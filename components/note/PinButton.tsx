"use client";
import { PinCardsAction, UnPinCardsAction } from "@/app/note/action";
import { doPin, laterDoPin } from "@/app/note/noteSlice";
import { RootState } from "@/app/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface PinButtonProps {
  cardId: string;
  pinned: boolean;
  focusingOnForm: boolean;
}

function PinButton({ cardId, pinned, focusingOnForm }: PinButtonProps) {
  const dispatch = useDispatch();
  const [displayPinned,setDisplayPinned ] = useState(pinned);
  const changePinState: boolean = useSelector(
    (state: RootState) => state.note.changePin
  );

  
  const clickPinButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    console.log("first", displayPinned);
    console.log("check", displayPinned);
    setDisplayPinned(!displayPinned)
  
    // if (!changePinState) {
    //   if (focusingOnForm) {
    //     dispatch(laterDoPin(true));
    //     dispatch(doPin(!changePinState))
    //     console.log("hiii");
    //   }else{
    //     PinCardsAction(cardId);

    //   }
    // } else {
    //   if (focusingOnForm) {
    //     dispatch(laterDoPin(true));
    //     dispatch(doPin(!changePinState))

    //   } else {
    //     UnPinCardsAction(cardId);
    //   }
    // }
  };
  return (
    <>
      <button
        className={displayPinned ? "bg-yellow-500 z-50" : "bg-slate-600 z-50"}
        onClick={(e) => {
          clickPinButtonHandler(e);
        }}
      >
        <div
        >
          Pin
        </div>
      </button>
    

    </>
  );
}

export default PinButton;
