"use client";

import { permanentRedirect, redirect } from "next/navigation";
import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
export type DocCardId = {
  _id: string;
};

function SearchBar() {
  const [searchText, setSearcText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const search = async (formData: FormData) => {
    // const res = await searchCardsWithInputTextACtion(formData);
    // const parsedObjectRes = Object.values<ICardAfterParsed>(
    //   JSON.parse(JSON.stringify(await res))
    // );
    redirect(`/searchedNotes/${searchText}/`);
    // dispatch(addSearchedCard(parsedObjectRes));
    // console.log(parsedObjectRes);
  };
  const clearButtonHandler = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    redirect(`/note`);
  };
  return (
    <>
    <div className="flex">
    <form action={search}>
        <input
          className="border-2 border-emerald-600 w-10"
          title="Search"
          name="text"
          type="text"
          ref={inputRef}
          value={searchText}
          onChange={(e) => setSearcText(e.target.value)}
        />
      </form>
      <form action={clearButtonHandler}>
        <button type="submit" onClick={() => clearButtonHandler()}>
          X
        </button>
      </form>
    </div>
   
    </>
  );
}

export default SearchBar;
