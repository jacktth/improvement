
import People from "@/models/People";
import { revalidatePath } from "next/cache";
async function AddCard() {
  const handleSubmit = async (forData:FormData) => {
    "use server"
    const name = forData.get("name")
    const age = forData.get("age")
    await People.insertMany([{name:name,age:age}]);
    revalidatePath("/inner_battle")
  };

  return (
    <main className="">
      <form method="post" action={handleSubmit}>
        {" "}
        <input type="text" name="name" />
        <input type="text" name="age" />
        <button type="submit">Send</button>
      </form>
    </main>
  );
}

export default AddCard