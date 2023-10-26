"use client";

import { redirect } from "next/navigation";
import { useRef, useState } from "react";
export type DocCardId = {
  _id: string;
};

function SearchBar() {
  const [searchText, setSearcText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const search = async (formData: FormData) => {
    redirect(`/searchedNotes/${searchText}/`);
  };
  const clearButtonHandler = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    redirect(`/note`);
  };
  return (
    <>
      <div className="flex bg-gray-400 ">
        <form action={clearButtonHandler}>
          <button type="submit" onClick={clearButtonHandler}>
            Search
          </button>
        </form>
        <form action={search}>
          <input
            className="border-2 w-30"
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
