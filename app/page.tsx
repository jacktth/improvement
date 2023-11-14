import CardsGallery from "@/components/note/CardsGallery";
import { ClassifiedCard, getCardsAction } from "./action";


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
