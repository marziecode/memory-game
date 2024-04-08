// import { useEffect, useState } from "react";
import { CARDS_ITEMS } from "./constants";
import cover from "./assets/cover-card.png";
import { useEffect, useState } from "react";

type SelectedCardType = {
  id: number;
  name: string;
};

function Cards() {
  const [selectedCard, setSelectedCard] = useState<SelectedCardType[]>([]);
  const [countWin, setCountWin] = useState<number>(0);

  const handelGetIdx = (id: number, name: string) => {
    const hasCard = selectedCard?.find((i) => i?.id === id);

    if (!hasCard) {
      setSelectedCard((prev) => [...prev, { id, name }]);
    }
  };

  function handleCalculateWin() {
    const obj1 = selectedCard[0];
    const obj2 = selectedCard[1];

    if (selectedCard.length === 2 && obj1?.name === obj2?.name) {
      console.log("WIN");
      setCountWin((prev) => prev + 1);
    } else if (selectedCard.length === 2) {
      setTimeout(() => {
        setSelectedCard([]);
      }, 900);

      setCountWin(0);
    }
  }

  useEffect(() => {
    handleCalculateWin();
  }, [selectedCard]);

  console.log(selectedCard, "ss");
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <div className="w-[100px] h-[40px] mb-[8px] flex justify-center items-center rounded-full mt-[8px] bg-blue-light">
        <p className="text-2xl text-black font-bold my-6">WIN : {countWin}</p>
      </div>

      <div className="w-[760px] h-[560px] rounded-3xl bg-blue-dark flex justify-center items-center flex-wrap">
        {CARDS_ITEMS.map((i, idx) => (
          <div
            key={idx}
            className="w-[200px] cursor-pointer h-[280px] flex justify-center items-center ml-2"
            onClick={() => handelGetIdx(i?.id, i?.name)}
          >
            <img
              src={
                selectedCard.some((item) => item.id === i.id) ? i.image : cover
              }
              className="w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default Cards;
