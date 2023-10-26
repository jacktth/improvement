"use client";
import { addCardAction } from "@/app/note/action";
import { ChangeEvent, useRef, useState } from "react";

function AddCardBar() {
  const [focusOnForm, setFocusOnForm] = useState(false);
  const [pin, setPin] = useState(false);
  const textAreaContentRef = useRef<HTMLTextAreaElement>(null);
  const textAreaTitleRef = useRef<HTMLTextAreaElement>(null);
  const divTitleRef = useRef<HTMLDivElement>(null);
  const divContentRef = useRef<HTMLDivElement>(null);
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
  const addCardByDiv = () => {
    console.log("addCardByDiv");
    
    if (
      divContentRef.current &&
      divTitleRef.current &&
      divTitleRef.current.innerText &&
      divContentRef.current.innerText
    ) {
      if (
        divTitleRef.current.innerText !== "" ||
        divContentRef.current.innerText !== ""
      ) {
        console.log("addCard");

        const addCardWithBinding = addCardAction.bind(
          null,
          pin,
          divContentRef.current.innerText,
          divTitleRef.current.innerText
        );
        addCardWithBinding();
        divTitleRef.current.textContent = "";
        divContentRef.current.textContent = "";
        setPin(false);
      }
     
    }
    setFocusOnForm(false);
    setPin(false);
  };
  // const addCard = () => {
  //   if (
  //     textAreaContentRef.current &&
  //     textAreaTitleRef.current &&
  //     formRef.current
  //   ) {
  //     if (
  //       textAreaContentRef.current.value !== "" ||
  //       textAreaTitleRef.current.value !== ""
  //     ) {
  //       console.log("addCard");

  //       const formData = new FormData(formRef.current);
  //       const addCardWithBinding = addCardAction.bind(null, pin, formData);
  //       addCardWithBinding();
  //       textAreaContentRef.current.value = "";
  //       textAreaTitleRef.current.value = "";
  //       setPin(false);
  //     }
  //     setFocusOnForm(false);
  //     setPin(false);
  //   }
  // };
  const formMissedFoucs = () => {
    addCardByDiv();
  };

  const clickSubmitButtonHandler = () => {
    addCardByDiv();
  };
  const invisbleLayerCss = () => {
    if (focusOnForm) {
      return ` z-[60] bg-gray-100/25 fixed  h-screen w-screen  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`;
    } else {
      return ``;
    }
  };
  return (
    <div>
      <div className="flex justify-center">
        <div
          onClick={() => formMissedFoucs()}
          className={invisbleLayerCss()}
        ></div>

        <form
          className="z-[70]"
          onClick={(e) => e.stopPropagation()}
          ref={formRef}
          // action={addCardByDiv}
        >
          {focusOnForm ? (
            <div className="">
              {/* <label htmlFor="">
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
              </label> */}
              <label htmlFor="">
                Title
                <div
                  className="hover:cursor-text"
                  ref={divTitleRef}
                  contentEditable
                  defaultValue={""}
                  autoFocus={focusOnForm}
                  suppressContentEditableWarning
                ></div>
              </label>
              <label htmlFor="">
                Content
                <div
                  className="hover:cursor-text"
                  ref={divContentRef}
                  contentEditable
                  defaultValue={"inputContent"}
                  onClick={() => {
                    setFocusOnForm(true);
                  }}
                  suppressContentEditableWarning
                  autoFocus={focusOnForm}
                ></div>
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
