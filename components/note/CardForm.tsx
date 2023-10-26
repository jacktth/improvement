"use client";
import {
  pinCardsAction,
  unPinCardsAction,
  updateCardsAction,
} from "@/app/note/action";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { laterDoPin } from "@/app/note/noteSlice";

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

  const textAreaContentRef = useRef<HTMLTextAreaElement>(null);
  const textAreaTitleRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const cardDisplayRef = useRef<HTMLDivElement>(null);
  const divTitleRef = useRef<HTMLDivElement>(null);
  const divContentRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  // const updateCardWithId = UpdateCardsAction.bind(null, cardId);
  // const handleTextareaSize = (e: ChangeEvent<HTMLTextAreaElement>) => {
  //   const target = e.target as HTMLTextAreaElement;
  //   switch (target.name) {
  //     case "content":
  //       if (textAreaContentRef.current) {
  //         textAreaContentRef.current.style.height = `${target.scrollHeight}px`;
  //       }
  //       break;
  //     case "title":
  //       if (textAreaTitleRef.current) {
  //         textAreaTitleRef.current.style.height = `${target.scrollHeight}px`;
  //       }
  //       break;
  //     default:
  //       console.error("unknown target name");
  //       break;
  //   }
  // };

  // const textareaContentOnChangeHandler = (
  //   e: ChangeEvent<HTMLTextAreaElement>
  // ) => {
  //   setInputContent(e.target.value);
  //   handleTextareaSize(e);
  //   console.log("inputContent", inputContent);
  // };

  // const textareaTitleOnChangeHandler = (
  //   e: ChangeEvent<HTMLTextAreaElement>
  // ) => {
  //   setInputTitle(e.target.value);
  //   handleTextareaSize(e);
  // };

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

        // formRef.current?.requestSubmit();
        // divContentRef.current.textContent = "";
        // divTitleRef.current.textContent = "";
      }
    }
    if (laterPin) {
      pinned ? unPinCardsAction(cardId) : pinCardsAction(cardId);
      dispatch(laterDoPin(false));
    }
    setFocusOnForm(false);
    setLaterPin(false);
  };
  // const updateCard = () => {
  //   if (textAreaContentRef.current && textAreaTitleRef.current) {
  //     const normalizedRefContent = textAreaContentRef.current.value
  //       .trim()
  //       .replace(/\r\n/g, "\n");
  //     const normalizedRefTitle = textAreaTitleRef.current.value
  //       .trim()
  //       .replace(/\r\n/g, "\n");
  //     console.log("normalizedPropContent ", content);

  //     const normalizedPropContent = content.trim().replace(/\r\n/g, "\n");

  //     const normalizedPropTitle = title.trim().replace(/\r\n/g, "\n");
  //     if (
  //       normalizedRefContent !== normalizedPropContent ||
  //       normalizedRefTitle !== normalizedPropTitle
  //     ) {
  //       formRef.current?.requestSubmit();
  //       textAreaContentRef.current.value = "";
  //       textAreaTitleRef.current.value = "";
  //     }
  //   }
  //   if (laterPin) {
  //     pinned ? UnPinCardsAction(cardId) : PinCardsAction(cardId);
  //     dispatch(laterDoPin(false));
  //   }
  //   setFocusOnForm(false);
  //   setLaterPin(false);
  // };
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
  const SmallCard = () => {
    return (
      <div
        ref={cardDisplayRef}
        id={Number(index).toString()}
        className={`border-2 border-gray-400 break-all break-words	${
          focusOnForm ? "invisible" : "visible"
        }`}
        onClick={() => viewCard()}
      >
        <button
          className={displayPin ? "bg-yellow-500 z-50" : "bg-slate-600 z-50"}
          onClick={(e) => {
            clickPinButtonHandler(e);
          }}
        >
          <div>Pin</div>
        </button>
        <pre className="overflow-x-auto whitespace-pre-wrap ">{inputTitle}</pre>
        <pre className="overflow-x-auto whitespace-pre-wrap ">
          {inputContent}
        </pre>
      </div>
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
              {/* <label htmlFor="">
                  Title
                  <textarea
                    className="resize-none overflow-hidden"
                    ref={textAreaTitleRef}
                    defaultValue={inputTitle}
                    onBlur={(e) => textareaTitleOnChangeHandler(e)}
                    onChange={(e) => textareaTitleOnChangeHandler(e)}
                    name="title"
                  />
                </label> */}
              {/* <label htmlFor="">
                  Content
                  <textarea
                    key={"random1"}
                    className="resize-none"
                    ref={textAreaContentRef}
                    // defaultValue={content}
                    name="content"
                    defaultValue={inputContent}
                    onBlur={(e) => textareaContentOnChangeHandler(e)}
                    // autoFocus={focusOnForm}
                  />
                </label> */}
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
      <LargeCard />
      <SmallCard />
    </main>
  );
}
export default CardForm;
