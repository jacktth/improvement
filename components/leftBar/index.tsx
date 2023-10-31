"use client";
import { useState } from "react";
import OptionItem from "./option";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import Link from "next/link";

export type OptionWordType =
  | "Notes"
  | "Reminders"
  | "Edit labels"
  | "Archive"
  | "Trash";

function LeftBar() {
  const [optionSelected, setOptionSelected] = useState<OptionWordType>("Notes");
  return (
    <>
      <div className="">
        <Link href="">
          {" "}
          <OptionItem
            children={<LightbulbOutlinedIcon sx={{ fontSize: 30 }} />}
            title={"Notes"}
            selectingOption={optionSelected}
            setOptionSelected={setOptionSelected}
          />
        </Link>
        <Link href="">
          {" "}
          <OptionItem
            children={<NotificationsNoneOutlinedIcon sx={{ fontSize: 30 }} />}
            title={"Reminders"}
            selectingOption={optionSelected}
            setOptionSelected={setOptionSelected}
          />
        </Link>
        <Link href="">
          {" "}
          <OptionItem
            children={<EditOutlinedIcon sx={{ fontSize: 30 }} />}
            title={"Edit labels"}
            selectingOption={optionSelected}
            setOptionSelected={setOptionSelected}
          />
        </Link>
        <Link href="">
          {" "}
          <OptionItem
            children={<ArchiveOutlinedIcon sx={{ fontSize: 30 }} />}
            title={"Archive"}
            selectingOption={optionSelected}
            setOptionSelected={setOptionSelected}
          />
        </Link>
        <Link href="">
          {" "}
          <OptionItem
            children={<DeleteOutlineSharpIcon sx={{ fontSize: 30 }} />}
            title={"Trash"}
            selectingOption={optionSelected}
            setOptionSelected={setOptionSelected}
          />
        </Link>
      </div>
    </>
  );
}

export default LeftBar;
