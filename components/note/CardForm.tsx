"use client";
import {
  pinCardsAction,
  unPinCardsAction,
  updateCardsAction,
} from "@/app/note/action";
import {
  ChangeEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
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
    setTransform(!transform);
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

  const [transform, setTransform] = useState(false);
  const [transformXY, setTransformXY] = useState<any>({ x: 0, y: 0 });
  const [initXY, setInitXY] = useState<any>({ x: 0, y: 0 });

  const [animateWidth, setAnimateWidth] = useState<number>(100);
  const [initAnimateWidth, setInitAnimateWidth] = useState<number>(100);
  const [diffTransformFromResize, setDiffTransformFromResize] = useState({
    x: 0,
    y: 0,
  });

  const divClickHandler = () => {
    setTransform(!transform);
    if (!transform) {
      setInitXY({ x: 0, y: 0 });
      setInitAnimateWidth(50);
    } else {
      setInitXY({ x: transformXY.x, y: transformXY.y });
      setInitAnimateWidth(animateWidth);
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
      setTransformXY({ x: diffX, y: diffY });

      const targetWidth = window.innerWidth / 3;
      setAnimateWidth(targetWidth);

      console.log("diffXY ", diffX, diffY);
    }
  };
  const transformBackEffect = () => {
    setTransformXY({ x: 0, y: 0 });
    setAnimateWidth(50);
    setDiffTransformFromResize({ x: 0, y: 0 });
  };
  useEffect(() => {
    if (transform) {
      transformEffect();
    } else {
      transformBackEffect();
    }
  }, [transform]);

  useEffect(() => {
    const handleResize = () => {
      if (
        transform === true &&
        initXY.x === transformXY.x &&
        animateWidth === initAnimateWidth
      ) {
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
          //add diffTransformFromResize is to add the diff value after previoud resize
          //this can prevent the incorrect resize
          const [diffX, diffY] = [
            destinationX - x + diffTransformFromResize.x,
            destinationY - y + diffTransformFromResize.x,
          ];
          setDiffTransformFromResize({ x: diffX, y: diffY });
          const targetWidth = window.innerWidth / 3;
          setAnimateWidth(targetWidth);
          setInitAnimateWidth(targetWidth);

          console.log("diffXY ", diffX, diffY);
          console.log("finished", " normal resizing");
        }
      } else if (
        transform === true &&
        initXY.x !== transformXY.x &&
        animateWidth !== initAnimateWidth
      ) {
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
          console.log("diffXY in resize init", diffX, diffY);

          setInitXY({ x: transformXY.x, y: transformXY.y });
          setDiffTransformFromResize({ x: diffX, y: diffX });
          const targetWidth = window.innerWidth / 3;
          setAnimateWidth(targetWidth);
          setInitAnimateWidth(targetWidth);

          console.log("diffXY ", diffX, diffY);
          console.log("finished", " init resizing");
        }
      }

      // console.log("res");
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const SmallCard = () => {
    return (
      <>
        <motion.div
          initial={{
            x: initXY.x + diffTransformFromResize.x,
            y: initXY.y,
            width: initAnimateWidth,
            position: "absolute",
          }}
          animate={{
            x: transformXY.x + diffTransformFromResize.x,
            y: transformXY.y,
            width: animateWidth,
          }}
          onClick={() => divClickHandler()}
          transition={{ duration: 1 }}
        >
          <div
            ref={cardDisplayRef}
            style={{}}
            className={`border-2 border-gray-400 break-all break-words  h-32 
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
              <div onClick={(e) => e.stopPropagation()}>
                <label htmlFor="">
                  Title
                  <div
                    className="hover:cursor-text resize"
                    ref={divTitleRef}
                    contentEditable
                    defaultValue={inputTitle}
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

        {/* {transform && (
          <AnimatePresence>
            {transform && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <LargeCard />
              </motion.div>
            )}
          </AnimatePresence>
        )} */}
      </>
    );
  };
  const LargeCard = () => {
    return (
      <div
        onClick={() => formMissedFoucs()}
        hidden={!transform}
        className="fixed h-screen w-screen  top-1/2 left-1/2 
        transform -translate-x-1/2 -translate-y-1/2
        bg-slate-500/80
        "
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
              hidden={!transform}
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
    <main className="w-32">
      {/* <LargeCard />
       */}
      <SmallCard />

      <div className="border-black border-2 h-32 w-32"></div>
    </main>
  );
}
export default CardForm;
