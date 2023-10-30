import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/components/redux/RedduxProvider";
import MenuIcon from "@mui/icons-material/Menu";
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import SearchBar from "@/components/topBar/SearchBar";
import SettingTools from "@/components/topBar/SettingTools";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-darkbg`}>
        <ReduxProvider>
          <div className="flex fixed justify-between w-screen h-20 bg-darkbg 
          border-b-[0.5px] border-gray-500">
            <div className="flex content-center ml-9  w-1/6">
              <button className="my-auto hover:bg-darkHoverCircle w-14 h-14  rounded-full">
                <MenuIcon sx={{ color: "white",fontSize: 30 }} />
              </button>
              
              <a href="http://" className="my-auto text-center">
                <NoteAltIcon sx={{ color: "orange",fontSize: 50 }}/>
                <span className="inline-block align-middle text-gray-200 text-2xl">
                  My Note
                </span>
              </a>
            </div>
            

          <div className="w-3/6 flex">
          <SearchBar />

          </div>

            <div className="text-white flex content-center w-1/6">
              
              <SettingTools/></div>
          </div>
          <div className="flex fixed top-20 w-screen">
            <div className="w-44  h-screen text-white">left bar</div>
            <div className="w-full">{children}</div>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
