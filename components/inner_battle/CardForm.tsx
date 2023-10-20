"use client";
import { addCard } from "@/app/inner_battle/action";
import { useState } from "react";

function CardForm() {
  const [toggle, setToggle] = useState(false);
  const Form = () => {
    return (
      <main className="">
        <form method="post" action={addCard}>
          {" "}
          <label htmlFor="">
            Title
            <input type="text" name="title" />
          </label>
          <label htmlFor="">
            Content
            <input type="text" name="content" />
          </label>
          <button type="submit">Send</button>
        </form>
      </main>
    );
  };
  return (
    <div>
      <button onClick={() => setToggle(!toggle)}>Add</button>
      {toggle ? <Form /> : <></>}
    </div>
  );
}
export default CardForm;
