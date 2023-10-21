"use client";
import { addCard } from "@/app/inner_battle/action";
import { ChangeEvent, useRef, useState } from "react";

function CardForm() {
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
  const submitCardForm = () => {
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
    submitCardForm();
    setFocusOnForm(false);
  };
  const Form = () => {
    return (
      <div>
        <main>
          <form ref={formRef} action={addCard}>
            {" "}
            {focusOnForm ? (
              <label htmlFor="">
                Title
                <textarea
                  className="resize-none"
                  ref={textAreaTitleRef}
                  name="title"
                />
              </label>
            ) : (
              <></>
            )}
            <label htmlFor="">
              Content
              <textarea
                key={"random1"}
                className="resize-none"
                ref={textAreaContentRef}
                name="content"
                onClick={() => setFocusOnForm(true)}
                onChange={(e) => textareaOnChangeHandler(e)}
                autoFocus={focusOnForm}
              />
            </label>
            <button type="submit">Send</button>
          </form>
        </main>
        {focusOnForm ? (
          <div
            className="fixed h-screen w-screen"
            onClick={formMissedFoucs}
          ></div>
        ) : (
          <></>
        )}
      </div>
    );
  };
  return <Form />;
}
export default CardForm;
