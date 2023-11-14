"use client";
import { addCardAction } from "@/app/action";
import { ChangeEvent, useRef, useState } from "react";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import PushPinIcon from "@mui/icons-material/PushPin";
function AddCardBar() {
  const [focusOnForm, setFocusOnForm] = useState(false);
  const [pin, setPin] = useState(false);
  const textAreaContentRef = useRef<HTMLInputElement>(null);
  const textAreaTitleRef = useRef<HTMLTextAreaElement>(null);
  const divTitleRef = useRef<HTMLDivElement>(null);
  const divContentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const handleTextareaSize = (e: ChangeEvent) => {
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

  const textareaOnChangeHandler = (e: ChangeEvent) => {
    handleTextareaSize(e);
  };
  const addCardByDiv = () => {
    console.log("addCardByDiv");

    if (divContentRef.current && divTitleRef.current) {
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

  const clickSubmitButtonHandler = () => {
    addCardByDiv();
  };
  const invisbleLayerCss = () => {
    if (focusOnForm) {
      return ` z-10 fixed  
      h-screen w-screen  top-1/2 left-1/2 
      transform -translate-x-1/2 -translate-y-1/2`;
    } else {
      return ``;
    }
  };
  return (
    <div
      className=" h-auto min-h-full w-2/3  bg-darkbg noteBoarder
     cursor-text shadow-black/30 shadow-xl
      "
    >
      <div
        className={focusOnForm ? invisbleLayerCss() : ""}
        onClick={(e) => {
          addCardByDiv();
        }}
      ></div>
      <form
        className="z-10 inline-block p-4 h-full w-full  relative content-center 
        rounded-xl bg-darkbg"
        onClick={(e) => {
          e.stopPropagation();
          setFocusOnForm(true);
        }}
        ref={formRef}
        // action={addCardByDiv}
      >
        {focusOnForm ? (
          <div className="h-full">
            <div className="flex">
              <div
                className="editableDiv w-full
           empty:before:content-[attr(title-placeholder)] 
           empty:before:text-darkPlaceHolder"
                ref={divTitleRef}
                contentEditable
                title-placeholder="Tilte"
                autoFocus={focusOnForm}
                suppressContentEditableWarning
              ></div>
              <div>
                <button type="button" onClick={() => setPin(!pin)}>
                  {" "}
                  {pin ? (
                    <PushPinIcon className="text-white" />
                  ) : (
                    <PushPinOutlinedIcon className="text-darkInactiveIcon" />
                  )}
                </button>
              </div>
            </div>

            <div
              className="editableDiv
              empty:before:content-[attr(contnet-placeholder)] 
              empty:before:text-darkPlaceHolder"
              ref={divContentRef}
              contentEditable
              contnet-placeholder="Take a note..."
              onClick={() => {
                setFocusOnForm(true);
              }}
              suppressContentEditableWarning
              autoFocus={focusOnForm}
            ></div>
            <button
            className="text-darkActiveText"
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
            <input
              className="  font-bold text-autoMax resize-none  outline-none
               bg-darkbg"
              placeholder="Take a note..."
            />
          </>
        )}
      </form>
    </div>
  );
}
export default AddCardBar;
