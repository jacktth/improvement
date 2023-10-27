"use client";
import {
  pinCardsAction,
  unPinCardsAction,
  updateCardsAction,
} from "@/app/note/action";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { laterDoPin } from "@/app/note/noteSlice";
import { AnimatePresence, motion } from "framer-motion";

function CardForm({
  title = "",
  content = "",
  cardId = "",
  index = 0,
  pinned = false,
  editedDate = "",
}) {
  const [focusOnForm, setFocusOnForm] = useState(false);
  const [displayPin, setDisplayPin] = useState(pinned);
  const [laterPin, setLaterPin] = useState(false);
  const [inputContent, setInputContent] = useState(content);
  const [inputTitle, setInputTitle] = useState(title);
  const formRef = useRef<HTMLFormElement>(null);
  const cardDisplayRef = useRef<HTMLDivElement>(null);
  const divTitleRef = useRef<HTMLDivElement>(null);
  const divContentRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const updateCardFromDiv = () => {
    if (
      divContentRef.current &&
      divTitleRef.current &&
      divTitleRef.current.textContent &&
      divContentRef.current.textContent
    ) {
      const normalizedRefContent = divContentRef.current.textContent
        .trim()
        .replace(/\r\n/g, "\n");
      const normalizedRefTitle = divTitleRef.current.textContent
        .trim()
        .replace(/\r\n/g, "\n");
      console.log("normalizedPropContent ", content);

      const normalizedPropContent = content.trim().replace(/\r\n/g, "\n");

      const normalizedPropTitle = title.trim().replace(/\r\n/g, "\n");
      if (
        normalizedRefContent !== normalizedPropContent ||
        normalizedRefTitle !== normalizedPropTitle
      ) {
        updateCardsAction(cardId, normalizedRefTitle, normalizedRefContent);
        setInputTitle(normalizedRefTitle);

        setInputContent(normalizedRefContent);
      }
    }
    if (laterPin) {
      pinned ? unPinCardsAction(cardId) : pinCardsAction(cardId);
      dispatch(laterDoPin(false));
    }
    setFocusOnForm(false);
    setLaterPin(false);
  };

  const formMissedFoucs = () => {
    document.body.style.overflow = "auto";
    // updateCard();
    updateCardFromDiv();
  };
  const clickSubmitButtonHandler = () => {
    // updateCard();
    updateCardFromDiv();
  };
  const viewCard = () => {
    document.body.style.overflow = "hidden";

    setFocusOnForm(true);
  };

  const clickPinButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setDisplayPin(!displayPin);

    if (!displayPin) {
      if (focusOnForm) {
        setLaterPin(true);
      } else {
        pinCardsAction(cardId);
      }
    } else {
      if (focusOnForm) {
        setLaterPin(true);
      } else {
        unPinCardsAction(cardId);
      }
    }
  };
  const transformEffect = () => {
    const ref = cardDisplayRef.current;
    console.log(ref?.style.translate);

    if (ref) {
      console.log("ref?.style.width", ref?.style.width);

      const [x, y] = [
        ref.getBoundingClientRect().x,
        ref.getBoundingClientRect().y,
      ];
      console.log("xy ", x, y);
      console.log("inner ", window.innerWidth, window.innerHeight);

      const [destinationX, destinationY] = [
        window.innerWidth / 3,
        window.innerHeight / 3,
      ];
      console.log("destinationXY ", destinationX, destinationY);
      const [diffX, diffY] = [destinationX - x, destinationY - y];
      setDestinationXY({ x: diffX, y: diffY });

      // ref.style.translate = `${diffX}px ${diffY}px`;
      // ref.style.width = "300px";
      // ref.style.cssText = `translate: ${diffX}px ${diffY}px; width: 300px;`;

      // setTranslateXY([diffX, diffY]);
      console.log("diffXY ", diffX, diffY);
      // const []
    }
  };
  const transformBackEffect = () => {
    const ref = cardDisplayRef.current;
    setDestinationXY({ x: 0, y: 0 });
  };

  const [selectedId, setSelectedId] = useState<null | string>(null);
  const [transform, setTransform] = useState(false);
  // const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  // const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);
  const [destinationXY, setDestinationXY] = useState({ x: 0, y: 0 });
  const [initXY, setInitXY] = useState({ x: 0, y: 0 });
  const [boundingRect, setBoundingRect] = useState({
    x: 0,
    y: 0,
  });
  const divClickHandler = () => {
    // setTransform(!transform);
    // const ref = cardDisplayRef.current;
    // if (transform === false && ref) {
    //   setdivWidth(ref.style.width);
    // }
    setTransform(!transform);
    if (!transform) {
      setInitXY({ x: 0, y: 0 });

      transformEffect();
    } else {
      setInitXY({ x: destinationXY.x, y: destinationXY.y });
    }
  };
  useEffect(() => {
    if (transform) {
    } else {
      transformBackEffect();
    }
  }, [transform]);

  const SmallCard = () => {
    return (
      <>
        <motion.div
          initial={{
            x: initXY.x,
            y: initXY.y,
            position: "absolute",
            height: 72,
          }}
          animate={{ x: destinationXY.x, y: destinationXY.y }}
          onClick={() => divClickHandler()}
        >
          <div
            ref={cardDisplayRef}
            style={{}}
            className={`border-2 border-gray-400 break-all break-words w-32  h-32 
          `}
            // ${focusOnForm ? "invisible" : "visible"}
          >
            <button
              className={
                displayPin ? "bg-yellow-500 z-50" : "bg-slate-600 z-50"
              }
              onClick={(e) => {
                clickPinButtonHandler(e);
              }}
            >
              <div>Pin</div>
            </button>

            {transform ? (
              <div onClick={(e)=>e.stopPropagation()}>
                <label htmlFor="">
                  Title
                  <div
                    className="hover:cursor-text resize"
                    ref={divTitleRef}
                    contentEditable
                    defaultValue={inputTitle}
                    autoFocus={focusOnForm}
                    suppressContentEditableWarning
                  >
                    <pre>{inputTitle}</pre>
                  </div>
                </label>
                <label htmlFor="">
                  Content
                  <div
                    className="hover:cursor-text resize"
                    ref={divContentRef}
                    contentEditable
                    defaultValue={inputContent}
                   
                    suppressContentEditableWarning
                    autoFocus={transform}
                  >
                    <pre>{inputContent}</pre>
                  </div>
                </label>
              </div>
            ) : (
              <>
                {" "}
                <pre className="overflow-x-auto whitespace-pre-wrap ">
                  {inputTitle}
                </pre>
                <pre className="overflow-x-auto whitespace-pre-wrap ">
                  {inputContent}
                </pre>
              </>
            )}
          </div>
        </motion.div>
      </>
    );
  };
  const LargeCard = () => {
    return (
      <div
        onClick={() => formMissedFoucs()}
        hidden={!focusOnForm}
        className="fixed h-screen w-screen  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <button
            className={displayPin ? "bg-yellow-500 z-50" : "bg-slate-600 z-50"}
            onClick={(e) => {
              clickPinButtonHandler(e);
            }}
          >
            <div>Pin</div>
          </button>
          <form ref={formRef} key={index}>
            <div
              className={`border-2 border-gray-400 break-all break-words`}
              hidden={!focusOnForm}
            >
              <label htmlFor="">
                Title
                <div
                  className="hover:cursor-text"
                  ref={divTitleRef}
                  contentEditable
                  defaultValue={inputTitle}
                  autoFocus={focusOnForm}
                  suppressContentEditableWarning
                >
                  <pre>{inputTitle}</pre>
                </div>
              </label>
              <label htmlFor="">
                Content
                <div
                  className="hover:cursor-text"
                  ref={divContentRef}
                  contentEditable
                  defaultValue={inputContent}
                  onClick={() => {
                    setFocusOnForm(true);
                  }}
                  suppressContentEditableWarning
                  autoFocus={focusOnForm}
                >
                  <pre>{inputContent}</pre>
                </div>
              </label>

              <div>{editedDate}</div>
              <button
                //Dont change to submit, casuing error
                type="button"
                onClick={() => clickSubmitButtonHandler()}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  return (
    <main className="w-full">
      {/* <LargeCard />
       */}
      <SmallCard />

      <div className="border-black border-2 h-32 w-32"></div>
    </main>
  );
}
export default CardForm;
