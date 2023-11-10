import React from "react";
import LoopIcon from '@mui/icons-material/Loop';
export default function Loading() {
  return (
    <section className="flex  w-screen top-14 justify-center items-center">
      {" "}
      <p className="text-white">
      <LoopIcon className="animate-spin "/>
        Free trial plan causes slow loading
      </p>
    </section>
  );
}
