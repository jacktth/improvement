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
      className=" w-2/3  bg-darkbg noteBoarder
     cursor-text shadow-black/30 shadow-xl h-max my-4
      "
    >
      <div
        className={focusOnForm ? invisbleLayerCss() : ""}
        onClick={(e) => {
          addCardByDiv();
        }}
      ></div>
      <form
        className={`z-10 ${
          focusOnForm ? "" : "flex items-center"
        }   h-full w-full  relative content-center`}
        onClick={(e) => {
          e.stopPropagation();
          setFocusOnForm(true);
        }}
        ref={formRef}
        // action={addCardByDiv}
      >
        {focusOnForm ? (
          <div className="h-full p-2 w-full">
            <div className="flex w-full justify-between">
              <div
                className="editableDiv w-10/12
           empty:before:content-[attr(title-placeholder)] 
           empty:before:text-darkPlaceHolder"
                ref={divTitleRef}
                contentEditable
                title-placeholder="Tilte"
                autoFocus={focusOnForm}
                suppressContentEditableWarning
              ></div>
              <div className="w-2/12">
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
              onClick={(e) => {
                e.stopPropagation();
                clickSubmitButtonHandler();
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {" "}
            <input
              className=" w-[100%] p-2  font-bold text-autoMax  rounded-lg outline-none
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
