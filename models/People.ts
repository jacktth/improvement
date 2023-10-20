import mongoose from "mongoose";

export interface IPeople {
  name: string;
  age: string;
}

const PeopleSchema = new mongoose.Schema<IPeople>({
  name: String,
  age: Number,
});

export default mongoose.models.People ||
  mongoose.model("People", PeopleSchema, "people");
