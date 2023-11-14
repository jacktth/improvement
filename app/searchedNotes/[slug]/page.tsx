import { searchCardsWithInputTextAction } from "@/app/action";
import CardForm from "@/components/note/CardForm";
import CardsGallery from "@/components/note/CardsGallery";
import { ICardAfterParsed } from "@/models/Card";

export default async function SearchedCardsPage({ params }: { params: { slug: string } }) {
        const res = await searchCardsWithInputTextAction(params.slug);
        const parsedObjectRes = Object.values<ICardAfterParsed>(
          JSON.parse(JSON.stringify(await res))
        );
       
    
  return (
    <>
    <CardsGallery {...{noPinnedCards:parsedObjectRes,PinnedCards:[]}}></CardsGallery>
    </>
  );
}
