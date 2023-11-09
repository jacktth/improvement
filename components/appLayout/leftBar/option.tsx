"use client";
import { Dispatch, ReactElement, ReactNode, SetStateAction, useState } from "react";
import { OptionWordType } from ".";
type OptionProps = {
  children?:  React.ReactNode;
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
      } w-full h-16 sm:pl-1 md:pl-4 rounded-r-full hover:bg-darkHoverCircle`}
      onClick={clickHandler}
    >
      <div className="text-center md:flex sm:inline-block">
        <div className="text-darkInactiveIcon">
          {children ? children : <></>}
        </div>
        <span className="menu-text ">{title}</span>
      </div>
    </button>
  );
}

export default OptionItem;
