import mongoose, { InferSchemaType, ObjectId, Schema } from "mongoose";

export interface ICard  {
  title: string;
  content: string;
  pinned: boolean;
  label: string[];
  date: Date;
  editedDate: Date;
}

export interface ICardAfterParsed extends ICard{

  _id: string;
  __v: number

}

const CardSchema:Schema<ICard> = new Schema<ICard>({
  title: String,
  content: String,

  pinned: {type:Boolean,required:true},
  label: [String],
  date: {type:Date,required:true},
  editedDate: {type:Date,required:true},
});


export default mongoose.models.Card ||
  mongoose.model<ICard>("Card", CardSchema, "card");
