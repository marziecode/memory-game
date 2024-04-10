import { CARDS_ITEMS } from "./constants";
import cover from "./assets/cover-card.png";
import { useEffect, useState } from "react";

type SelectedCardType = {
  id: number;
  name: string;
  image?: string;
};

function Cards() {
  const [selectedCard, setSelectedCard] = useState<SelectedCardType[]>([]);
  const [countWin, setCountWin] = useState<number>(0);
  const [winCardsName, setWinCardsName] = useState<SelectedCardType[]>([]);
  const [randomCardData, setRandomCardData] = useState<SelectedCardType[]>([]);

  const handelGetIdx = (id: number, name: string) => {
    const hasCard = selectedCard?.find((i) => i?.id === id);

    if (!hasCard && selectedCard.length !== 2) {
      setSelectedCard((prev) => [...prev, { id, name }]);
    }
  };

  function handleCalculateWin() {
    if (selectedCard[0]?.name === selectedCard[1]?.name) {
      setCountWin((prev) => prev + 1);
      setSelectedCard([]);
      setWinCardsName((prev) => [...prev, ...selectedCard]);
    } else if (selectedCard.length === 2) {
      setTimeout(() => {
        setSelectedCard([]);
      }, 300);
    }
  }

  const generateRandomData = () => {
    const randNum = Math.floor(Math.random() * CARDS_ITEMS.length);
    const sl = CARDS_ITEMS.slice(0, randNum);

    let p: any = [];
    CARDS_ITEMS.map((i) => {
      const hasSl = sl.some((x) => x.id === i.id);
      if (!hasSl) {
        p.push(i);
      }
    });

    setRandomCardData([...p, ...sl]);
  };

  const handleRefresh = () => {
    setSelectedCard([]);
    setCountWin(0);
    setWinCardsName([]);
    generateRandomData();
  };

  useEffect(() => {
    if (selectedCard.length !== 0) {
      handleCalculateWin();
    }
  }, [selectedCard]);

  useEffect(() => {
    generateRandomData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-[#212121]">
      <div className="w-[100px] h-[30px]  flex justify-center items-center rounded-full mt-[6px] mb-[6px] bg-[#535C91]">
        <p className="text-1xl text-[#fff] font-bold my-6">WIN : {countWin}</p>
      </div>
      <button className="text-2xl text-white my-8" onClick={handleRefresh}>
        Refresh
      </button>

      <div className="w-[760px] h-[560px] rounded-3xl bg-[#070F2B] flex justify-center items-center flex-wrap">
        {randomCardData?.map((i, idx) => (
          <div
            key={idx}
            className="w-[200px] cursor-pointer h-[280px] flex justify-center items-center ml-2"
            onClick={() => handelGetIdx(i?.id, i?.name)}
          >
            <img
              src={
                [...selectedCard, ...winCardsName].some(
                  (item) => item.id === i.id
                )
                  ? i?.image
                  : cover
              }
              className="w-[175px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default Cards;
