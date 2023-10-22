"use client";
import { updateCardsAction } from "@/app/note/action";
import { json } from "node:stream/consumers";
import { ChangeEvent, useEffect, useRef, useState } from "react";

function CardForm({ title = "", content = "", id = "", index = 0 }) {
  const [focusOnForm, setFocusOnForm] = useState(false);
  const textAreaContentRef = useRef<HTMLTextAreaElement>(null);
  const textAreaTitleRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const cardDisplayRef = useRef<HTMLDivElement>(null);
  const updateCardWithId = updateCardsAction.bind(null, id);
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
  const submitCardForm = () => {
    if (textAreaContentRef.current && textAreaTitleRef.current) {
      if (
        (textAreaContentRef.current.value !== "" ||
          textAreaTitleRef.current.value !== "") &&
        (textAreaContentRef.current.value !== content ||
          textAreaTitleRef.current.value !== title)
      ) {
        console.log(
          "true",
          "ref",
          textAreaContentRef.current.value,
          "con",
          content
        );
        console.log("true", "title:", textAreaTitleRef.current.value, title);
        console.log(
          textAreaContentRef.current.value !== content,
          textAreaTitleRef.current.value !== title
        );

        formRef.current?.requestSubmit();
        textAreaContentRef.current.value = "";
        textAreaTitleRef.current.value = "";
      }
    }
  };
  const updateCard = () => {
    if (textAreaContentRef.current && textAreaTitleRef.current) {
      const normalizedRefContent = textAreaContentRef.current.value
        .trim()
        .replace(/\r\n/g, "\n");
      const normalizedRefTitle = textAreaTitleRef.current.value
        .trim()
        .replace(/\r\n/g, "\n");
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
  };
  const formMissedFoucs = () => {
    updateCard();
    setFocusOnForm(false);
  };
  const clickSubmitButtonHandler = () => {
    updateCard();
    setFocusOnForm(false);
  };
  const viewCard = () => {
    setFocusOnForm(true);
  };

  const Form = () => {
    return (
      <main>
        <div
          onClick={() => formMissedFoucs()}
          hidden={!focusOnForm}
          className="fixed h-screen w-screen  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <form ref={formRef} action={updateCardWithId} key={index}>
              {focusOnForm ? (
                <div>
                  <label htmlFor="">
                    Title
                    <textarea
                      className="resize-none"
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

        <div
          ref={cardDisplayRef}
          id={Number(index).toString()}
          className={`border-2 border-gray-400 break-all break-words	${
            focusOnForm ? "invisible" : "visible"
          }`}
          onClick={() => viewCard()}
        >
          <pre className="overflow-x-auto whitespace-pre-wrap ">{title}</pre>
          <pre className="overflow-x-auto whitespace-pre-wrap "> {content}</pre>
        </div>
      </main>
    );
  };
  return <Form />;
}
export default CardForm;
