"use client";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { redirect } from "next/navigation";
import { useRef, useState } from "react";
export type DocCardId = {
  _id: string;
};

function SearchBar() {
  const [searchText, setSearcText] = useState("");
  const [clickInput, setClickInput] = useState(false);
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
      <div
        className={`flex grow  m-2 ${
          clickInput ? "bg-white" : "bg-darkSearchBar"
        } flex   rounded-lg`}
      >
        <form action={search} className="flex grow content-center">
          <button
            className="hover:bg-darkHoverCircle rounded-full m-auto"
            type="submit"
          >
            <SearchIcon
              className={`m-2 ${clickInput ? "text-black" : "text-darkActiveText"}`}
              sx={{ fontSize: 30 }}
            />
          </button>
          <input
            className={` w-30 outline-none text-2xl grow ${
              clickInput
                ? "bg-white caret-black text-black"
                : "bg-darkSearchBar caret-white text-white"
            }`}
            title="Search"
            name="text"
            type="text"
            placeholder="Search"
            ref={inputRef}
            value={searchText}
            onFocus={() => setClickInput(true)}
            onBlur={() => setClickInput(false)}
            onChange={(e) => setSearcText(e.target.value)}
          />
          <button
            className="m-auto hover:bg-darkHoverCircle rounded-full"
            type="button"
            onClick={() => clearButtonHandler()}
          >
            <ClearIcon
              className={`m-2 ${clickInput ? "text-black" : "text-darkActiveText"} `}
              sx={{ fontSize: 30 }}
            />
          </button>
        </form>
      </div>
    </>
  );
}

export default SearchBar;
