import { searchCardsWithInputTextAction } from "@/app/note/action";
import CardForm from "@/components/note/CardForm";
import { ICardAfterParsed } from "@/models/Card";

export default async function SearchedCardsPage({ params }: { params: { slug: string } }) {
        const res = await searchCardsWithInputTextAction(params.slug);
        const parsedObjectRes = Object.values<ICardAfterParsed>(
          JSON.parse(JSON.stringify(await res))
        );
       
    
  return (
    <div className="grid grid-cols-4 gap-4 w-full pt-4 pl-4">
      {parsedObjectRes.map((cardInfo: ICardAfterParsed, i) => (
        <div key={cardInfo._id}>
          <CardForm
            content={cardInfo.content}
            title={cardInfo.title}
            cardId={cardInfo._id}
            index={i}
            pinned={cardInfo.pinned}
            editedDate={cardInfo.editedDate.toString()}
          />
        </div>
      ))}
    </div>
  );
}
