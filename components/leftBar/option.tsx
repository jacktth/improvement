"use client";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { OptionWordType } from ".";
type OptionProps = {
  children: ReactNode;
  title: OptionWordType;
  selectingOption: String;
  setOptionSelected: Dispatch<SetStateAction<OptionWordType>>;
};
function OptionItem({
  children,
  title,
  selectingOption,
  setOptionSelected,
}: OptionProps) {

  const clickHandler = () =>{
    setOptionSelected(title)
  }
  return (
    <button
      className={`${
        selectingOption===title ? "bg-darkFocusOption" : ""
      } w-full h-16 pl-9 rounded-r-full hover:bg-darkHoverCircle`}
      onClick={clickHandler}
    >
      <div className="flex">
        <div className="text-darkLeftBarIcon">
          {children ? children : <></>}
        </div>
        <span className="ml-10 text-lg text-darkLeftBarText">{title}</span>
      </div>
    </button>
  );
}

export default OptionItem;
