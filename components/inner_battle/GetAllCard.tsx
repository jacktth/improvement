"use server"
import People, { IPeople } from "@/models/People";

async function GetAllCard() {

const peopleData = await People.find();

  return <main className="">
    {peopleData ? peopleData.map(cardInfo =>
        <div className="Row">
          {cardInfo.name}
          {cardInfo.age}

        </div>
      )  :<></>}
  </main>;
}

export default GetAllCard;
