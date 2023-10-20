import CardForm from "@/components/inner_battle/CardForm";
import { ICard } from "@/models/Card";
import { getCards } from "./action";

export default function Card() {
  const CardsGallery = async () => {
    const cards: ICard[] = await getCards();
    return (
      <div>
        {cards ? (
          cards.map((cardInfo) => (
            <div className="">
              {cardInfo.title}
              {cardInfo.content}
              {cardInfo.date.toString() }

            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    );
  };

  return (
    <div>
      <CardForm></CardForm>
      <CardsGallery />
    </div>
  );
}
