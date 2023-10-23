import CardsGallery from "@/components/note/CardsGallery";
import { getCardsAction } from "./action";
import AddCardBar from "@/components/note/addCardBar";
import SearchBar from "@/components/note/SearchBar";
import { Provider } from "react-redux";
import { store } from "../store";

export default async function Card() {
  const cards = JSON.parse(JSON.stringify(await getCardsAction()));
  
  return (
   
      <div>
        <SearchBar />

        <AddCardBar></AddCardBar>

        <CardsGallery {...cards}></CardsGallery>
      </div>
    
  );
}
