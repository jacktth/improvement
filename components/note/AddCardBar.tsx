"use client";
import { addCardAction } from "@/app/note/action";
import { ChangeEvent, useRef, useState } from "react";

function AddCardBar() {
  const [focusOnForm, setFocusOnForm] = useState(false);
  const [pin, setPin] = useState(false);
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
    if (
      textAreaContentRef.current &&
      textAreaTitleRef.current &&
      formRef.current
    ) {
      if (
        textAreaContentRef.current.value !== "" ||
        textAreaTitleRef.current.value !== ""
      ) {
        console.log("addCard");

        const formData = new FormData(formRef.current);
        const addCardWithBinding = addCardAction.bind(null, pin, formData);
        addCardWithBinding();
        textAreaContentRef.current.value = "";
        textAreaTitleRef.current.value = "";
        setPin(false);
      }
      setFocusOnForm(false);
      setPin(false);
    }
  };
  const formMissedFoucs = () => {
    addCard();
  };

  const clickSubmitButtonHandler = () => {
    addCard();
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
      <div className="flex justify-center">
        <form
          onClick={(e) => e.stopPropagation()}
          ref={formRef}
          action={addCardAction.bind(null, pin)}
        >
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
                  placeholder="Take a note..."
                />
              </label>
              <button
                //Dont change to submit, casuing error
                type="button"
                onClick={() => clickSubmitButtonHandler()}
              >
                Close
              </button>
              <div className={pin ? "bg-yellow-500" : "bg-slate-600"}>
                <button type="button" onClick={() => setPin(!pin)}>
                  {" "}
                  Pin
                </button>
              </div>
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
                  placeholder="Take a note..."
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