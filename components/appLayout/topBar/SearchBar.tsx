"use client";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { redirect, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { searchCardByText } from "@/app/noteSlice";

function SearchBar() {
  const [searchText, setSearcText] = useState("");
  const [clickInput, setClickInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const { push } = useRouter();
  const search = async (formData: FormData) => {
    dispatch(searchCardByText(searchText));
    redirect(`/searchedNotes/${searchText}/`);
  };
  const clearButtonHandler = () => {
    
    if (inputRef.current) {
      inputRef.current.value = "";
      setSearcText("")
    }
    dispatch(searchCardByText(""));
    push(`/`);
    
  };
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div
        className={`flex  w-full h-2/3  ${
          clickInput ? "bg-white" : "bg-darkSearchBar"
        } flex   rounded-lg`}
      >
        <form action={search} className="flex grow content-center">
          <button
            className="hover:bg-darkHoverCircle rounded-full m-auto"
            type="submit"
          >
            <SearchIcon
              className={`m-2 ${
                clickInput ? "text-black" : "text-darkActiveText"
              }`}
              sx={{ fontSize: 30 }}
            />
          </button>
          <input
            className={` w-20 outline-none text-2xl grow ${
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
              className={`m-2 ${
                clickInput ? "text-black" : "text-darkActiveText"
              } `}
              sx={{ fontSize: 30 }}
            />
          </button>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;
