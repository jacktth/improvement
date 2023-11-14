import React from "react";
import LoopIcon from "@mui/icons-material/Loop";
export default function Loading() {
  return (
    <section className="flex h-full  justify-center items-center">
      {" "}
      <p className="text-white text-4xl">
        <LoopIcon className="animate-spin text-8xl" />
        Loading data
      </p>
    </section>
  );
}
