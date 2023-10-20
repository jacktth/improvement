import mongoose from "mongoose";

export interface ICard {
  title: string;
  content: string;
  date: Date
}

const CardSchema = new mongoose.Schema<ICard>({
  title: String,
  content: String,
  date: Date
});

export default mongoose.models.Card ||
  mongoose.model("Card", CardSchema, "card");
