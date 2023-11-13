import CardsGallery from "@/components/note/CardsGallery";
import { ClassifiedCard, getCardsAction } from "./action";
import SearchBar from "@/components/appLayout/topBar/SearchBar";
import { Provider } from "react-redux";
import { store } from "../store";
import AddCardBar from "@/components/note/AddCardBar";

export default async function Card() {
  const classifiedCards: ClassifiedCard = JSON.parse(
    JSON.stringify(await getCardsAction())
  );
  return (
    <div className="h-[98%] mt-[1%]">
  
      <div className=" h-full">
      <CardsGallery {...classifiedCards}></CardsGallery>

      </div>

    
    </div>
  );
}
