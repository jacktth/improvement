"use client";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import ViewAgendaOutlinedIcon from "@mui/icons-material/ViewAgendaOutlined";
import { changeToListView } from "@/app/note/noteSlice";
function SettingTools() {
  const listView: boolean = useSelector(
    (state: RootState) => state.note.listView
  );
  const dispatch = useDispatch();

  return (
    <button
        className=" hover:bg-darkHoverCircle rounded-full grow m-auto w-14 h-14"
        type="button"
        onClick={() => dispatch(changeToListView(!listView))}
      >
        {listView ? (
          <ViewAgendaOutlinedIcon className="text-white menu-icon" />
        ) : (
          <GridViewOutlinedIcon className="text-white menu-icon"  />
        )}
      </button>

  );
}

export default SettingTools;
