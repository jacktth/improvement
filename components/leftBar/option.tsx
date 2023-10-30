"use client";
import { ReactNode, useState } from "react";
type OptionProps = {
  children: ReactNode;
  title: String;
};
function OptionItem({ children, title }: OptionProps) {
  const [selected, setselected] = useState(false);
  return (
    <button className="focus:bg-darkFocusOption w-full h-16 pl-9 rounded-r-full">
      <div className="flex">
        <div className="text-darkLeftBarIcon">{children ? children : <></>}</div>
        <span className="ml-10 text-lg text-darkLeftBarText">{title}</span>
      </div>
    </button>
  );
}

export default OptionItem;
