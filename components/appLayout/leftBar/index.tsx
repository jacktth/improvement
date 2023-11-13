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
      <div className="h-full">
        <Link href="/note">
          {" "}
          <OptionItem
            title={"Notes"}
            selectingOption={optionSelected}
            setOptionSelected={setOptionSelected}
          >
            <div className="menu-icon-container ">
              <LightbulbOutlinedIcon className="menu-icon" />
            </div>
          </OptionItem>
        </Link>
        <Link href="/note">
          {" "}
          <OptionItem
            title={"Reminders"}
            selectingOption={optionSelected}
            setOptionSelected={setOptionSelected}
          >
            <div className="menu-icon-container ">
              <NotificationsNoneOutlinedIcon className="menu-icon" />
            </div>
          </OptionItem>
        </Link>
        <Link href="/note">
          {" "}
          <OptionItem
            title={"Edit labels"}
            selectingOption={optionSelected}
            setOptionSelected={setOptionSelected}
          >
            <div className="menu-icon-container ">
              <EditOutlinedIcon className="menu-icon" />
            </div>
          </OptionItem>
        </Link>
        <Link href="/note">
          {" "}
          <OptionItem
            title={"Archive"}
            selectingOption={optionSelected}
            setOptionSelected={setOptionSelected}
          >
            <div className="menu-icon-container ">
              <ArchiveOutlinedIcon className="menu-icon" />
            </div>
          </OptionItem>
        </Link>
        <Link href="/note">
          {" "}
          <OptionItem
            title={"Trash"}
            selectingOption={optionSelected}
            setOptionSelected={setOptionSelected}
          >
            <div className="menu-icon-container ">
              <DeleteOutlineSharpIcon className="menu-icon" />
            </div>
          </OptionItem>
        </Link>
      </div>
    </>
  );
}

export default LeftBar;
