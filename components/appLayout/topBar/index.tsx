import MenuIcon from "@mui/icons-material/Menu";
import NoteAltIcon from '@mui/icons-material/NoteAlt';

import SearchBar from "@/components/appLayout/topBar/SearchBar";
import SettingTools from "@/components/appLayout/topBar/SettingTools";
function TopBar() {
  return (
    <div
      className="flex  justify-between w-full h-full bg-darkbg 
        border-b-[0.5px] border-gray-500"
    >
      <div className="flex lg:pl-4 w-1/6   ">
        <button className="
        hover:bg-darkHoverCircle  rounded-full w-full 
        md:my-auto md:h-16 md:w-16">
          <MenuIcon className="menu-icon  text-white" />
        </button>

        <a href="/" className="my-auto text-center hidden sm:hidden md:block">
          <NoteAltIcon
            className="text-orange-300 
    text-[35px] sm:text-[35px] md:text-[40px] lg:text-[50px] xl:text-[60px]"
          />
          <span
            className="inline-block align-middle ml-2
          text-gray-200 text-[0px] sm:text-[20px] md:text-[23px] lg:text-[30px] "
          >
            Notes
          </span>
        </a>
      </div>

      <div className="w-4/6 md:w-full flex">
        <SearchBar />
      </div>

      <div className="text-white menu-icon flex content-center w-1/6">
        <SettingTools />
      </div>
    </div>
  );
}

export default TopBar;
