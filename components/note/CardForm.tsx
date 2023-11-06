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
  const [mouseIn, setMouseIn] = useState(false);
  const [noDiffBetweenInItAndActual, setNoDiffBetweenInItAndActual] =
    useState(false);
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

      console.log("normalizedPropContent ", content);

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
    setMouseIn(false);
  };

  const clickPinButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setDisplayPin(!displayPin);

    if (!displayPin) {
      if (transform) {
        resetInitToTransformedPosition();
        setLaterPin(true);
      } else {
        pinCardsAction(cardId);
      }
    } else {
      if (transform) {
        resetInitToTransformedPosition();
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

      const [destinationX, destinationY] = [window.innerWidth / 3, 100];
      const [diffX, diffY] = [destinationX, destinationY];
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
    const [destinationX, destinationY] = [window.innerWidth / 3, 100];
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

    setNoDiffBetweenInItAndActual(false);
  }, [transform]);
  const resetInitToTransformedPosition = () => {
    setInitAnimateWidth(animateWidth);
    setInitDestinationBypx({ x: destinationBypx.x, y: destinationBypx.y });
  };
  useEffect(() => {
    const handleResize = () => {
      const [diffX, diffY] = [
        calculateTheValueForTranSlation()[0],
        calculateTheValueForTranSlation()[1],
      ];
      const targetWidth = window.innerWidth / 3;
      setAnimateWidth(targetWidth);
      setInitAnimateWidth(targetWidth);
      setInitDestinationBypx({ x: diffX, y: diffY });
      setDestinationBypx({ x: diffX, y: diffY });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  useEffect(() => {
    console.log("title:title", title.length);
  }, []);
  const mouseInHandler = () => {
    if (transform) {
    } else if (noDiffBetweenInItAndActual === false) {
      setInitAnimateWidth("220px");
      setInitDestinationBypx({ x: "auto", y: "auto" });
      setNoDiffBetweenInItAndActual(true);
    } else if (transform === false) {
      setMouseIn(true);
    }
  };
  const mouseLeaveHandler = () => {
    if (transform) {
    } else {
      setMouseIn(false);
    }
  };
  const SmallCard = () => {
    return (
      <>
        <motion.div
          className=" "
          initial={{
            // x: initXY.x + diffTransformFromResize.x,
            // y: initXY.y + diffTransformFromResize.y,
            width: initAnimateWidth,
            position: "fixed",

            top: initDestinationBypx.y,
            left: initDestinationBypx.x,
            zIndex: transform ? 50 : 0,
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
            onMouseEnter={mouseInHandler}
            onMouseLeave={mouseLeaveHandler}
            ref={cardDisplayRef}
            className={`w-full h-auto   break-all noteBoarder  text-white p-3
            ${
              transform
                ? "bg-darkbg shadow-black/20 shadow-lg z-50"
                : "noteBoarder"
            }

          `}
          >
            {transform ? (
              <div onClick={(e) => e.stopPropagation()}>
                <div className="flex">
                  <div
                    className="editableDiv w-full 
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
                    className="icon-hover icon-position"
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
                  className="relative h-96 w-full editableDiv   overflow-auto "
                  ref={divContentRef}
                  contentEditable
                  dangerouslySetInnerHTML={{ __html: inputContent }}
                  suppressContentEditableWarning
                  autoFocus={true}
                ></div>
              </div>
            ) : (
              <>
                {" "}
                <div>
                  <div className="flex ">
                    <div
                      className="w-full "
                      dangerouslySetInnerHTML={{ __html: inputTitle }}
                    ></div>

                    <button
                      className={`icon-hover icon-position ${
                        mouseIn ? "visible" : "invisible"
                      }`}
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
                  <div className={"w-full max-h-20 overflow-hidden  "}>
                    <pre
                      dangerouslySetInnerHTML={{ __html: inputContent }}
                    ></pre>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </>
    );
  };

  return (
    <main className="w-32">
      <SmallCard />

      <div className={` h-32 w-32`}></div>
      {transform && (
        <div
          className="fixed h-screen w-screen 
         top-0 left-0 z-10
        bg-[#202124]/75

        "
          onClick={() => exitViewCardHandler()}
        ></div>
      )}
    </main>
  );
}
export default CardForm;
