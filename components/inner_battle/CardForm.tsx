"use client";
import { addCard } from "@/app/inner_battle/action";
import { ChangeEvent, useRef, useState } from "react";

function CardForm() {
  const [focusOnForm, setFocusOnForm] = useState(false);
  const [textAreaContent, setTextAreaContent] = useState("");
  const [textAreaTitle, setTextAreaTitle] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const handleTextareaSize = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    if (textAreaRef.current) {
      textAreaRef.current.style.height = `${target.scrollHeight}px`;
    }
  };
  const handleTextareaInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    const value = target.value;

    switch (target.name) {
      case "content":
        setTextAreaContent(value);
        break;
      case "title":
        setTextAreaTitle(value);

        break;
      default:
        console.error("unknown target name");
        break;
    }
  };
  const textareaOnChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    handleTextareaSize(e);
    handleTextareaInput(e);
  };
  const formMissedFoucs = () => {
    if (textAreaContent || textAreaTitle) {
      formRef.current?.requestSubmit();
      setTextAreaContent("")
      setTextAreaTitle("")
    }
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
                  name="title"
                  value={textAreaTitle}
                  onChange={(e) => textareaOnChangeHandler(e)}
                />
              </label>
            ) : (
              <></>
            )}
            <label htmlFor="">
              Content
              <textarea
                className="resize-none"
                value={textAreaContent}
                ref={textAreaRef}
                name="content"
                contentEditable={true}
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
