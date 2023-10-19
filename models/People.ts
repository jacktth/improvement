import mongoose from "mongoose";

const PeopleSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

export default mongoose.models.People ||
  mongoose.model("People", PeopleSchema, "people");
