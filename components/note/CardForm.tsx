"use client";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import PushPinIcon from "@mui/icons-material/PushPin";
import {
  pinCardsAction,
  unPinCardsAction,
  updateCardsAction,
} from "@/app/action";
import {
  ChangeEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { laterDoPin } from "@/app/noteSlice";
import { AnimatePresence, motion } from "framer-motion";
import { log } from "console";
import { RootState } from "@/app/store";

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
  const responsiveHeight = {
    base: 300,
    short: 400,
    mid: 520,
    tall: 800,
  };
 

  const [displayPin, setDisplayPin] = useState(pinned);
  const [laterPin, setLaterPin] = useState(false);
  const [mouseIn, setMouseIn] = useState(false);
  const [noDiffBetweenInItAndActual, setNoDiffBetweenInItAndActual] =
    useState(true);
  const [inputContent, setInputContent] = useState(content);
  const [inputTitle, setInputTitle] = useState(title);
  const noteContainerRef = useRef<HTMLDivElement>(null);
  const divTitleRef = useRef<HTMLDivElement>(null);
  const divContentRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const [transform, setTransform] = useState(false);
  const [transformSideEffect, setTransformSideEffect] = useState(false);
  const [destinationBypx, setDestinationBypx] = useState<CSSCoordinationObject>(
    { x: "auto", y: "auto" }
  );
  const [initDestinationBypx, setInitDestinationBypx] =
    useState<CSSCoordinationObject>({ x: "auto", y: "auto" });
  const [animateHeight, setAnimateHeight] = useState<number | string>(
    "100%"
  );
  const [initAnimateHeight, setInitAnimateHeight] = useState<number | string>(
    "100%"
  );
  const [animateWidth, setAnimateWidth] = useState<number | string>("100%");
  const [initAnimateWidth, setInitAnimateWidth] = useState<number | string>(
    "100%"
  );
 
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
  const exitViewCardHandler = () => {
    document.body.style.overflow = "auto";
    triggerTransformAnimationSideEffect();
    updateCard();
 
    console.log("exit viewing");
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
  const calculateTheValueForTranslation = () => {
    const ref = noteContainerRef.current;

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
    if (!transform && motionDiv.current) {
    const initNotewidth = motionDiv.current?.clientWidth
      // setInitXY({ x: 0, y: 0 });
      // setInitAnimateWidth(50);
      console.log("enter transform animation");
      setInitAnimateWidth(initNotewidth! );
      setInitAnimateHeight("100%");
      setInitDestinationBypx({ x: "auto", y: "auto" });
    } else if(transform ) {
      // setInitXY({ x: transformXY.x, y: transformXY.y });
      setInitAnimateWidth(animateWidth);
      setInitAnimateHeight(0);
      setInitDestinationBypx({ x: destinationBypx.x, y: destinationBypx.y });
      if (noteContainerRef.current) {
        // setInitAnimateHeight(noteContainerRef.current.clientHeight);
        // setAnimateHeight(noteContainerRef.current.clientHeight);
        // console.log(
        //   "exit viewing now, set init and animation height,",
        //   noteContainerRef.current.clientHeight
        // );
      }
      
      
      console.log("exit transform animation setInitDestinationBypx",destinationBypx.x, destinationBypx.y );

      console.log("exit transform animation");
    } else {
      throw new Error("check whether motion Div Ref exist");
      
      
    }
  };
  const EnterAnimationEffect = () => {
    // const [diffX, diffY] = calculateTheValueForTranslation();
    // setTransformXY({ x: diffX, y: diffY });
    const targetWidth = window.innerWidth / 3;

    // const targetHeight = window.innerWidth / 2;
    setAnimateWidth(targetWidth);
    if (window.innerHeight > 1000) {
      setAnimateHeight(responsiveHeight.tall);
      console.log(
        "EnterAnimationEffect set height for destination",
        responsiveHeight.tall
      );
    } else if (window.innerHeight > 800) {
      setAnimateHeight(responsiveHeight.mid);
      console.log(
        "EnterAnimationEffect set height for destination",
        responsiveHeight.mid
      );
    } else if (window.innerHeight > 600) {
      setAnimateHeight(responsiveHeight.short);
      console.log(
        "EnterAnimationEffect set height for destination",
        responsiveHeight.short
      );
    } else {
      setAnimateHeight(responsiveHeight.base);
      console.log(
        "EnterAnimationEffect set height for destination",
        responsiveHeight.base
      );
    }

    const [destinationX, destinationY] = [window.innerWidth / 3, 100];
    setDestinationBypx({ x: destinationX, y: destinationY });
    setTransformSideEffect(false);
    console.log(
      "EnterAnimationEffect set width and height for destination",
      targetWidth
    );
  };
  const ExitAnimationEffect = () => {

    setAnimateWidth("100%");
    setAnimateHeight("100%");
    console.log("side effect of ExitAnimationEffect");
    setDestinationBypx({ x: "auto", y: "auto" });
    setTransformSideEffect(false);
  };
  const resetInitToTransformedPosition = () => {
    setInitAnimateWidth(animateWidth);
    setInitAnimateHeight(animateHeight);

    setInitDestinationBypx({ x: destinationBypx.x, y: destinationBypx.y });
  };
  const mouseInHandler = () => {

    if (transform) {
    } else if (noDiffBetweenInItAndActual === false) {
      setInitDestinationBypx({ x: "auto", y: "auto" });
      setInitAnimateWidth("100%")
      setInitAnimateHeight("100%")
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
  useEffect(() => {
    if (transform && transformSideEffect) {
      EnterAnimationEffect();
      console.log("trigger EnterAnimationEffect in useeffectr");
    } else if (transform === false && transformSideEffect) {
      ExitAnimationEffect();
      console.log("trigger ExitAnimationEffect in useeffectr");
    }

    setNoDiffBetweenInItAndActual(false);
  }, [transform]);

  useEffect(() => {
    const resetHightState = () => {
      const heightString = animateHeight.toString().replace("px", "");
      const heightNumber = Number(heightString);
      console.log("heightNumber in resetHightState", heightString);

      if (window.innerHeight > 1000 && heightNumber <= 1000) {
        setAnimateHeight(responsiveHeight.tall);
        setInitAnimateHeight(responsiveHeight.tall);
        console.log(
          "EnterAnimationEffect set height for destination",
          responsiveHeight.tall
        );
      } else if (window.innerHeight > 800 && heightNumber <= 800) {
        setAnimateHeight(responsiveHeight.mid);
        setInitAnimateHeight(responsiveHeight.mid);

        console.log(
          "EnterAnimationEffect set height for destination",
          responsiveHeight.mid
        );
      } else if (window.innerHeight > 600 && heightNumber <= 600) {
        setAnimateHeight(responsiveHeight.short);
        setInitAnimateHeight(responsiveHeight.short);

        console.log(
          "EnterAnimationEffect set height for destination",
          responsiveHeight.short
        );
      } else if (window.innerHeight < 600 && heightNumber > 600) {
        setAnimateHeight(responsiveHeight.base);
        setInitAnimateHeight(responsiveHeight.base);

        console.log(
          "EnterAnimationEffect set height for destination",
          responsiveHeight.base
        );
      }
    };
    const handleResize = () => {
      if (transform) {
        const [diffX, diffY] = [
          calculateTheValueForTranslation()[0],
          calculateTheValueForTranslation()[1],
        ];
        const targetWidth = window.innerWidth / 3;
        const targetHeight = window.innerWidth / 2;
        setAnimateWidth(targetWidth);
        // setAnimateHeight(targetHeight);
        setInitAnimateWidth(targetWidth);
        // setInitAnimateHeight(targetHeight);
        setInitDestinationBypx({ x: diffX, y: diffY });
        setDestinationBypx({ x: diffX, y: diffY });
        resetHightState();
      }
      console.log("handleResize triggered in useeffects");
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  const motionDiv = useRef<HTMLDivElement>(null);
  const SmallCard = () => {
    return (
      <>
        <motion.div
        ref={motionDiv}
          className="noteBoarder border-2 p-2"
          initial={{
            width: initAnimateWidth,
            height: initAnimateHeight,
            position: !transform ? "static" : "fixed",

            top: initDestinationBypx.y,
            left: initDestinationBypx.x,
            zIndex: transform ? 50 : 0,
          }}
          animate={{
            width: animateWidth,
            height: animateHeight,

            top: destinationBypx.y,
            left: destinationBypx.x,
          }}
          onClick={() => enterViewCard()}
          transition={{ duration: 0.3 }}
        >
          {transform ? (
            <div
              onClick={(e) => e.stopPropagation()}
              ref={noteContainerRef}
              className={`   break-all overflow-auto text-white 
                h-[99.99999999%] 
                ${
                  transform
                    ? "bg-darkbg shadow-black/20 shadow-lg z-50"
                    : "noteBoarder"
                }
              `}
            >
              <div className="flex ">
                <div
                  className="editableDiv
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
              {/* h-[${responsiveHeight.base}px] 
                  short:h-[${responsiveHeight.short}px]
                   mid:h-[${responsiveHeight.mid}px] 
                   tall:h-[${responsiveHeight.tall}px]  */}
              <div
                className={` 
                   w-full editableDiv   overflow-auto`}
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
              <div
                className="h-full text-white"
                onMouseEnter={mouseInHandler}
                onMouseLeave={mouseLeaveHandler}
              >
                <div className="flex relative justify-between">
                  <pre
                    className="h-1/6  overflow-hidden  "
                    dangerouslySetInnerHTML={{ __html: inputTitle }}
                  ></pre>

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
                <pre
                  className="h-5/6  overflow-hidden  "
                  dangerouslySetInnerHTML={{ __html: inputContent }}
                ></pre>
              </div>
            </>
          )}
        </motion.div>
      </>
    );
  };

  return (
    <main className="h-[250px]  w-full   bg-black">
      <SmallCard />

      {transform && (
        <div
          className="fixed h-full w-full 
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
