"use client";
import { searchCardsWithInputTextACtion } from "@/app/note/action";
import { increment, addSearchedCard } from "@/app/note/noteSlice";
import { ICard, ICardAfterParsed } from "@/models/Card";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
export type DocCardId = {
  _id: string;
};
function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const search = async (forData: FormData) => {
    const res = await searchCardsWithInputTextACtion(forData);
    const parsedObjectRes = Object.values<ICardAfterParsed>(
      JSON.parse(JSON.stringify(await res))
    );

    dispatch(addSearchedCard(parsedObjectRes));
    console.log(parsedObjectRes);
  };
  const clearButtonHandler = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      dispatch(addSearchedCard([]))
    }
  };
  return (
    <>
      <form action={search}>
        <input
          className="border-2 border-emerald-600 w-10"
          title="Search"
          name="text"
          type="text"
          ref={inputRef}
        />
        <button type="button" onClick={clearButtonHandler}>
          X
        </button>
      </form>
    </>
  );
}

export default SearchBar;
