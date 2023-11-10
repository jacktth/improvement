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
      } w-full h-16  lg:pl-4 rounded-r-full hover:bg-darkHoverCircle`}
      onClick={clickHandler}
    >
      <div className="text-center sm:inline-block md:flex lg:flex ">
        <div className="text-darkInactiveIcon">
          {children ? children : <></>}
        </div>
        <span className="menu-text hidden sm:hidden md:flex">{title}</span>
      </div>
    </button>
  );
}

export default OptionItem;
