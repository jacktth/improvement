import CardsGallery from "@/components/note/CardsGallery";
import { ClassifiedCard, getCardsAction } from "./action";
import SearchBar from "@/components/note/SearchBar";
import { Provider } from "react-redux";
import { store } from "../store";
import AddCardBar from "@/components/note/AddCardBar";

export default async function Card() {
  const classifiedCards: ClassifiedCard = JSON.parse(
    JSON.stringify(await getCardsAction())
  );
  return (
    <div>
      <SearchBar />

      <AddCardBar></AddCardBar>

      <CardsGallery {...classifiedCards}></CardsGallery>
    </div>
  );
}