"use client";
import { addCardAction } from "@/app/note/action";
import { ChangeEvent, useRef, useState } from "react";

function AddCardBar() {
  const [focusOnForm, setFocusOnForm] = useState(false);
  const textAreaContentRef = useRef<HTMLTextAreaElement>(null);
  const textAreaTitleRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
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
  const addCard = () => {
    if (textAreaContentRef.current && textAreaTitleRef.current) {
      if (
        textAreaContentRef.current.value !== "" ||
        textAreaTitleRef.current.value !== ""
      ) {
        formRef.current?.requestSubmit();
        textAreaContentRef.current.value = "";
        textAreaTitleRef.current.value = "";
      }
    }
  };
  const formMissedFoucs = () => {
    addCard();
    setFocusOnForm(false);
  };

  const clickSubmitButtonHandler = () => {
    addCard();
    setFocusOnForm(false);
  };
  const invisbleLayerCss = () => {
    if (focusOnForm) {
      return ` fixed h-screen w-screen  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`;
    } else {
      return ``;
    }
  };
  return (
    <div onClick={() => formMissedFoucs()} className={invisbleLayerCss()}>
      <div  className="flex justify-center">
        <form onClick={(e) => e.stopPropagation()} ref={formRef} action={addCardAction}>
          {focusOnForm ? (
            <div>
              <label htmlFor="">
                Title
                <textarea
                  className="resize-none overflow-hidden"
                  ref={textAreaTitleRef}
                  name="title"
                />
              </label>
              <label htmlFor="">
                Content
                <textarea
                  key={"random1"}
                  className="resize-none"
                  ref={textAreaContentRef}
                  name="content"
                  onClick={() => {
                    setFocusOnForm(true);
                  }}
                  onChange={(e) => textareaOnChangeHandler(e)}
                  autoFocus={focusOnForm}
                />
              </label>
              <button
                //Dont change to submit, casuing error
                type="button"
                onClick={() => clickSubmitButtonHandler()}
              >
                Send
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
}
export default AddCardBar;
