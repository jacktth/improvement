import mongoose, { ObjectId } from "mongoose";

export interface ICard {
  title: string;
  content: string;
  pinned: boolean;
  label:string[];
  date: Date
  _id: mongoose.Types.ObjectId
}

export interface ICardAfterParsed {
  title: string;
  content: string;
  pinned: boolean;
  label:string[];
  date: Date
  _id: string
}

const CardSchema = new mongoose.Schema<ICard>({
  title: String,
  content: String,
  date: Date
});

CardSchema.index({content:'text',title:'text'})

export default mongoose.models.Card ||
  mongoose.model("Card", CardSchema, "card");
