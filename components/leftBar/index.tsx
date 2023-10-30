"use client";
import { useState } from "react";
import OptionItem from "./option";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
function LeftBar() {
  const [selected, setselected] = useState(false);
  return (
    <>
      <div className="">
        <OptionItem
          children={<LightbulbOutlinedIcon  sx={{ fontSize: 30 }} />}
          title={"Notes"}
        />
        <OptionItem
          children={<NotificationsNoneOutlinedIcon sx={{ fontSize: 30 }} />}
          title={"Reminds"}
        />
        <OptionItem
          children={<EditOutlinedIcon sx={{ fontSize: 30 }} />}
          title={"Edit labels"}
        />
        <OptionItem
          children={<ArchiveOutlinedIcon sx={{ fontSize: 30 }} />}
          title={"Archive"}
        />
        <OptionItem
          children={<DeleteOutlineSharpIcon sx={{ fontSize: 30 }} />}
          title={"Trash"}
        />
      </div>
    </>
  );
}

export default LeftBar;
