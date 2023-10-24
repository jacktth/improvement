"use client";
import {
  PinCardsAction,
  UnPinCardsAction,
  updateCardsAction,
} from "@/app/note/action";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { RootState } from "@/app/store";
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

  const textAreaContentRef = useRef<HTMLTextAreaElement>(null);
  const textAreaTitleRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const cardDisplayRef = useRef<HTMLDivElement>(null);
  const laterDoPinState: boolean = useSelector(
    (state: RootState) => state.note.laterDoPin
  );
  const dispatch = useDispatch();
  const updateCardWithId = updateCardsAction.bind(null, cardId);
  const handleTextareaSize = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    switch (target.name) {
      case "content":
        if (textAreaContentRef.current) {
          textAreaContentRef.current.style.height = `${target.scrollHeight}px`;
        }
        break;
      case "title":
        if (textAreaTitleRef.current) {
          textAreaTitleRef.current.style.height = `${target.scrollHeight}px`;
        }
        break;
      default:
        console.error("unknown target name");
        break;
    }
  };

  const textareaOnChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    handleTextareaSize(e);
  };

  const updateCard = () => {
    if (textAreaContentRef.current && textAreaTitleRef.current) {
      const normalizedRefContent = textAreaContentRef.current.value
        .trim()
        .replace(/\r\n/g, "\n");
      const normalizedRefTitle = textAreaTitleRef.current.value
        .trim()
        .replace(/\r\n/g, "\n");
      console.log("normalizedPropContent ", content);

      const normalizedPropContent = content.trim().replace(/\r\n/g, "\n");

      const normalizedPropTitle = title.trim().replace(/\r\n/g, "\n");
      if (
        normalizedRefContent !== normalizedPropContent ||
        normalizedRefTitle !== normalizedPropTitle
      ) {
        formRef.current?.requestSubmit();
        textAreaContentRef.current.value = "";
        textAreaTitleRef.current.value = "";
      }
    }
    if (laterPin) {
      pinned ? UnPinCardsAction(cardId) : PinCardsAction(cardId);
      dispatch(laterDoPin(false));
    }
    setFocusOnForm(false);
    setLaterPin(false);
  };
  const formMissedFoucs = () => {
    document.body.style.overflow = "auto";
    updateCard();
  };
  const clickSubmitButtonHandler = () => {
    updateCard();
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
        PinCardsAction(cardId);
      }
    } else {
      if (focusOnForm) {
        setLaterPin(true);
      } else {
        UnPinCardsAction(cardId);
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

        <pre className="overflow-x-auto whitespace-pre-wrap ">{title}</pre>
        <pre className="overflow-x-auto whitespace-pre-wrap ">{content}</pre>
        <div>{editedDate}</div>
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
          <form ref={formRef} action={updateCardWithId} key={index}>
            {focusOnForm ? (
              <div>
                <label htmlFor="">
                  Title
                  <textarea
                    className="resize-none overflow-hidden"
                    ref={textAreaTitleRef}
                    defaultValue={title}
                    name="title"
                  />
                </label>
                <label htmlFor="">
                  Content
                  <textarea
                    key={"random1"}
                    className="resize-none"
                    ref={textAreaContentRef}
                    defaultValue={content}
                    name="content"
                    onClick={() => {
                      setFocusOnForm(true);
                    }}
                    onChange={(e) => textareaOnChangeHandler(e)}
                    // autoFocus={focusOnForm}
                  />
                </label>
                <button
                  //Dont change to submit, casuing error
                  type="button"
                  onClick={() => clickSubmitButtonHandler()}
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                {" "}
                <label htmlFor="">
                  Content
                  <textarea
                    key={"random1"}
                    className="resize-none"
                    ref={textAreaContentRef}
                    defaultValue={content}
                    name="content"
                    onClick={() => {
                      setFocusOnForm(true);
                    }}
                    onChange={(e) => textareaOnChangeHandler(e)}
                    autoFocus={focusOnForm}
                  />
                </label>
              </>
            )}
          </form>
        </div>
      </div>
    );
  };
  return (
    <main>
      <LargeCard />
      <SmallCard />
    </main>
  );
}
export default CardForm;
