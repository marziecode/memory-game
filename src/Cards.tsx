// import { useEffect, useState } from "react";
import { CARDS_ITEMS } from "./constants";
import cover from "./assets/cover-card.png";
import { useEffect, useState } from "react";

type CardType = {
  id: string;
  image: any;
  name: string;
};

type SelectedCard = {
  id: number;
  name: string;
};

// const hasCard = selectedId.some((i) => i.id !== id);

// console.log(hasCard, "hascard");
// if (hasCard) {
//   setSelectedId((prev) => [...prev, { id, name }]);
// } else {
//   //problem is here
//   setSelectedId([{ id, name }]);
// }

function Cards() {
  const [selectedId, setSelectedId] = useState<SelectedCard[]>([]);

  console.log(selectedId, "selectedid");

  const handelGetIdx = (id: number, name: string) => {
    const x = selectedId.some((i) => i.id !== id);
    if (x) {
      setSelectedId((prev) => [...prev, { id, name }]);
    } else {
      setSelectedId([{ id, name }]);
    }
    console.log(x, "x");
    console.log(selectedId, "sss");
  };

  useEffect(() => {}, []);

  console.log(selectedId);
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="w-[800px] h-[590px] rounded-3xl bg-blue-dark flex justify-center items-center flex-wrap">
        {CARDS_ITEMS.map((i, idx) => (
          <div
            key={idx}
            className="w-[200px] cursor-pointer h-[280px] flex justify-center items-center ml-2"
            onClick={() => handelGetIdx(i?.id, i?.name)}
          >
            <img src={i.image} className="w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
export default Cards;
