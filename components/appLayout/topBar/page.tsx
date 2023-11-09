import MenuIcon from "@mui/icons-material/Menu";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import SearchBar from "@/components/appLayout/topBar/SearchBar";
import SettingTools from "@/components/appLayout/topBar/SettingTools";
function TopBar() {
  return (
    <div
      className="flex fixed justify-between w-screen h-20 bg-darkbg 
        border-b-[0.5px] border-gray-500"
    >
      <div className="flex content-center ml-9  w-2/6">
        <button className="my-auto hover:bg-darkHoverCircle w-14 h-14  rounded-full">
          <MenuIcon className="menu-icon text-white" />
        </button>

        <a href="/note" className="my-auto text-center">
          <NoteAltIcon
            className="text-orange-300 
            text-[35px] sm:text-[35px] md:text-[40px] lg:text-[50px]"
          />
          <span className="inline-block align-middle 
          text-gray-200 text-[0px] sm:text-[20px] md:text-[23px] lg-[30px]">
            Notes
          </span>
        </a>
      </div>

      <div className="w-full flex">
        <SearchBar />
      </div>

      <div className="text-white menu-icon flex content-center w-1/6">
        <SettingTools />
      </div>
    </div>
  );
}

export default TopBar;
