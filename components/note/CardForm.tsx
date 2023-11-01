"use client";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import PushPinIcon from "@mui/icons-material/PushPin";
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
import { log } from "console";

type CSSCoordinationObject = {
  x: string | number;
  y: string | number;
};

function CardForm({
  title = "",
  content = "",
  cardId = "",
  index = 0,
  pinned = false,
  editedDate = "",
}) {
  const [displayPin, setDisplayPin] = useState(pinned);
  const [laterPin, setLaterPin] = useState(false);
  const [inputContent, setInputContent] = useState(content);
  const [inputTitle, setInputTitle] = useState(title);
  const formRef = useRef<HTMLFormElement>(null);
  const cardDisplayRef = useRef<HTMLDivElement>(null);
  const divTitleRef = useRef<HTMLDivElement>(null);
  const divContentRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const [transform, setTransform] = useState(false);
  const [transformSideEffect, setTransformSideEffect] = useState(false);
  const [transformXY, setTransformXY] = useState<any>({ x: 0, y: 0 });
  const [destinationBypx, setDestinationBypx] = useState<CSSCoordinationObject>(
    { x: "auto", y: "auto" }
  );
  const [initDestinationBypx, setInitDestinationBypx] =
    useState<CSSCoordinationObject>({ x: "auto", y: "auto" });
  const [initXY, setInitXY] = useState<any>({ x: 0, y: 0 });
  const [animateWidth, setAnimateWidth] = useState<number | string>("220px");
  const [initAnimateWidth, setInitAnimateWidth] = useState<number | string>(
    "220px"
  );
  const [diffTransformFromResize, setDiffTransformFromResize] = useState({
    x: 0,
    y: 0,
  });
  const updateCard = () => {
    if (divContentRef.current && divTitleRef.current) {
      const titleInnerHTML = divTitleRef.current.innerHTML;
      const contentInnerHTML = divContentRef.current.innerHTML;

      // const normalizedRefTitle = titleTextContent
      //   ? titleTextContent.trim().replace(/\r\n/g, "\n")
      //   : "";
      // const normalizedRefContent = contentTextContent
      //   ? contentTextContent.trim().replace(/\r\n/g, "\n")
      // : "";
      console.log("normalizedPropContent ", content);

      // const normalizedPropContent = content.trim().replace(/\r\n/g, "\n");

      // const normalizedPropTitle = title.trim().replace(/\r\n/g, "\n");
      if (contentInnerHTML !== content || titleInnerHTML !== title) {
        updateCardsAction(cardId, titleInnerHTML, contentInnerHTML);
        setInputTitle(titleInnerHTML);
        setInputContent(contentInnerHTML);
      }
    } else {
      console.log("losing current ref:");
    }
    if (laterPin) {
      pinned ? unPinCardsAction(cardId) : pinCardsAction(cardId);
      dispatch(laterDoPin(false));
    }
    setLaterPin(false);
  };
  const exitViewCardHandler = () => {
    document.body.style.overflow = "auto";
    triggerTransformAnimationSideEffect();
    updateCard();
    console.log("exit viewing");
  };
  const clickSubmitButtonHandler = () => {
    // updateCard();
    updateCard();
  };
  const enterViewCard = () => {
    document.body.style.overflow = "hidden";
    triggerTransformAnimationSideEffect();
    setTransformSideEffect(true);
  };

  const clickPinButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setDisplayPin(!displayPin);

    if (!displayPin) {
      if (transform) {
        setLaterPin(true);
      } else {
        pinCardsAction(cardId);
      }
    } else {
      if (transform) {
        setLaterPin(true);
      } else {
        unPinCardsAction(cardId);
      }
    }
  };
  const calculateTheValueForTranSlation = () => {
    const ref = cardDisplayRef.current;

    if (ref) {
      const [x, y] = [
        ref.getBoundingClientRect().x,
        ref.getBoundingClientRect().y,
      ];

      const [destinationX, destinationY] = [
        window.innerWidth / 3,
        window.innerHeight / 4,
      ];
      const [diffX, diffY] = [destinationX - x, destinationY - y];
      setDestinationBypx({ x: destinationX, y: destinationY });
      console.log("ref?.style.width", ref?.style.width);

      console.log("xy ", x, y);
      console.log("inner ", window.innerWidth, window.innerHeight);

      console.log("destinationXY ", destinationX, destinationY);
      return [diffX, diffY];
    } else {
      console.error("ref hook of card is undefined");
      return [];
    }
  };
  const triggerTransformAnimationSideEffect = () => {
    //the action here is for the correct init position setting,
    //the useEffect hook will do the animation movement
    //do not move the below set init destination to the useEffect hook
    //otheries, there is crappy animation
    setTransform(!transform);
    setTransformSideEffect(true);
    if (!transform) {
      // setInitXY({ x: 0, y: 0 });
      // setInitAnimateWidth(50);
      console.log("enter transform animation");
      setInitAnimateWidth("220px");
      setInitDestinationBypx({ x: "auto", y: "auto" });
    } else {
      // setInitXY({ x: transformXY.x, y: transformXY.y });
      setInitAnimateWidth(animateWidth);
      setInitDestinationBypx({ x: destinationBypx.x, y: destinationBypx.y });

      console.log("exit transform animation");
    }
  };
  const transformEnterEffect = () => {
    // const [diffX, diffY] = calculateTheValueForTranSlation();
    // setTransformXY({ x: diffX, y: diffY });
    const targetWidth = window.innerWidth / 3;
    setAnimateWidth(targetWidth);
    const [destinationX, destinationY] = [
      window.innerWidth / 3,
      window.innerHeight / 4,
    ];
    setDestinationBypx({ x: destinationX, y: destinationY });
    setTransformSideEffect(false);
  };
  const transformExitEffect = () => {
    // setTransformXY({ x: 0, y: 0 });
    setInitAnimateWidth(animateWidth);
    setAnimateWidth("220px");
    // setDiffTransformFromResize({ x: 0, y: 0 });
    console.log("side effect");

    setDestinationBypx({ x: "auto", y: "auto" });
    setTransformSideEffect(false);
  };
  useEffect(() => {
    if (transform && transformSideEffect) {
      transformEnterEffect();
    } else if (transform === false && transformSideEffect) {
      transformExitEffect();
    }
  }, [transform]);

  useEffect(() => {
    const handleResize = () => {
      if (
        transform === true &&
        initXY.x === transformXY.x &&
        animateWidth === initAnimateWidth
      ) {
        //add diffTransformFromResize is to add the diff value after previoud resize
        //this can prevent the incorrect resize
        // const [diffX, diffY] = [
        //   calculateTheValueForTranSlation()[0] + diffTransformFromResize.x,
        //   calculateTheValueForTranSlation()[1] + diffTransformFromResize.y,
        // ];
        // setDiffTransformFromResize({ x: diffX, y: diffY });
        const targetWidth = window.innerWidth / 3;
        setAnimateWidth(targetWidth);
        setInitAnimateWidth(targetWidth);

        // console.log("diffXY ", diffX, diffY);
        console.log("finished", " normal resizing");
      } else if (
        transform === true &&
        initXY.x !== transformXY.x &&
        animateWidth !== initAnimateWidth
      ) {
        const [diffX, diffY] = calculateTheValueForTranSlation();

        setInitXY({ x: transformXY.x, y: transformXY.y });
        setDiffTransformFromResize({ x: diffX, y: diffX });
        const targetWidth = window.innerWidth / 3;
        setAnimateWidth(targetWidth);
        setInitAnimateWidth(targetWidth);
        console.log("diffXY in resize init", diffX, diffY);

        console.log("finished", " init resizing");
      }

      // console.log("res");
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  useEffect(() => {
    console.log("title:title", title.length);
  }, []);

  const SmallCard = () => {
    return (
      <>
        <motion.div
          className=" "
          initial={{
            // x: initXY.x + diffTransformFromResize.x,
            // y: initXY.y + diffTransformFromResize.y,
            width: initAnimateWidth,
            position: "absolute",

            top: initDestinationBypx.y,
            left: initDestinationBypx.x,
            zIndex: transform ? 2 : 1,
          }}
          animate={{
            // x: transformXY.x + diffTransformFromResize.x,
            // y: transformXY.y + diffTransformFromResize.y,
            width: animateWidth,
            top: destinationBypx.y,
            left: destinationBypx.x,
          }}
          onClick={() => enterViewCard()}
          transition={{ duration: 0.1 }}
        >
          <div
            ref={cardDisplayRef}
            className={`w-full h-40   break-all noteBoarder  text-white
            ${transform ? "bg-darkbg " : "noteBoarder"}

          `}
          >
            {transform ? (
              <div onClick={(e) => e.stopPropagation()}>
                <div className="flex">
                  <div
                    className="editableDiv w-full z-50 
                    empty:before:content-[attr(title-placeholder)] 
                    empty:before:text-darkPlaceHolder"
                    ref={divTitleRef}
                    dangerouslySetInnerHTML={{
                      __html: inputTitle === "" ? "" : inputTitle,
                    }}
                    contentEditable
                    title-placeholder="Title"
                    suppressContentEditableWarning
                  ></div>
                  <button
                    className="icon-hover"
                    onClick={(e) => {
                      clickPinButtonHandler(e);
                    }}
                  >
                    {displayPin ? (
                      <PushPinIcon className="text-white" />
                    ) : (
                      <PushPinOutlinedIcon className="text-darkInactiveIcon" />
                    )}
                  </button>
                </div>

                <div
                  className="relative  w-full editableDiv z-[50]  "
                  ref={divContentRef}
                  contentEditable
                  dangerouslySetInnerHTML={{ __html: inputContent }}
                  suppressContentEditableWarning
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      const selection = window.getSelection();
                      if (selection) {
                        const range = selection.getRangeAt(0);
                        const br = document.createElement("br");
                        range.insertNode(br);
                        range.setStartAfter(br);
                        range.setEndAfter(br);
                        selection.removeAllRanges();
                        selection.addRange(range);
                      }
                    }
                  }}
                >
                  {/* <pre className="h-11">{inputContent}</pre> */}
                </div>
              </div>
            ) : (
              <>
                {" "}
                <div>
                  <div className="flex ">
                    <div className="w-full" dangerouslySetInnerHTML={{ __html: inputTitle }}></div>

                    {/* <pre
                      className="overflow-x-auto text-ellipsis 
                  whitespace-pre-wrap grow "
                    >
                      {inputTitle}
                    </pre> */}
                    <button
                      className="icon-hover "
                      onClick={(e) => {
                        clickPinButtonHandler(e);
                      }}
                    >
                      {displayPin ? (
                        <PushPinIcon className="text-white" />
                      ) : (
                        <PushPinOutlinedIcon className="text-darkInactiveIcon" />
                      )}
                    </button>
                  </div>
                  <div
                    className={"w-full"}
                    dangerouslySetInnerHTML={{ __html: inputContent }}
                  ></div>
                  {/* <pre className="text-ellipsis overflow-hidden w-full">
                    {inputContent}
                  </pre> */}
                </div>
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
  // const LargeCard = () => {
  //   return (
  //     <div
  //       onClick={() => exitViewCardHandler()}
  //       hidden={!transform}
  //       className="fixed h-screen w-screen  top-1/2 left-1/2
  //       transform -translate-x-1/2 -translate-y-1/2
  //       bg-slate-500/80
  //       "
  //     >
  //       <div
  //         onClick={(e) => e.stopPropagation()}
  //         className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2

  //         "
  //       >
  //         <button
  //           className={displayPin ? "bg-yellow-500 z-50" : "bg-slate-600 z-50"}
  //           onClick={(e) => {
  //             clickPinButtonHandler(e);
  //           }}
  //         >
  //           <div>Pin</div>
  //         </button>
  //         <form ref={formRef} key={index}>
  //           <div
  //             className={`border-2 border-gray-400 break-all break-words`}
  //             hidden={!transform}
  //           >
  //             <label htmlFor="">
  //               Title
  //               <div
  //                 className="hover:cursor-text"
  //                 ref={divTitleRef}
  //                 contentEditable
  //                 defaultValue={inputTitle}
  //                 autoFocus={focusOnForm}
  //                 suppressContentEditableWarning
  //               >
  //                 <pre>{inputTitle}</pre>
  //               </div>
  //             </label>
  //             <label htmlFor="">
  //               Content
  //               <div
  //                 className="hover:cursor-text"
  //                 ref={divContentRef}
  //                 contentEditable
  //                 defaultValue={inputContent}
  //                 suppressContentEditableWarning
  //                 autoFocus={focusOnForm}
  //               >
  //                 <pre>{inputContent}</pre>
  //               </div>
  //             </label>

  //             <div>{editedDate}</div>
  //             <button
  //               //Dont change to submit, casuing error
  //               type="button"
  //               onClick={() => clickSubmitButtonHandler()}
  //             >
  //               Close
  //             </button>
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   );
  // };
  return (
    <main className="w-32">
      <SmallCard />

      <div className={` h-32 w-32`}></div>
      {transform && (
        <div
          className="fixed h-screen w-screen 
         top-0 left-0
        bg-slate-500/10  

        "
          onClick={() => exitViewCardHandler()}
        ></div>
      )}
    </main>
  );
}
export default CardForm;
