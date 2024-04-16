import { CARDS_ITEMS } from "./constants";
import cover from "./assets/cover-card.png";
import { useEffect, useState } from "react";

type SelectedCardType = {
  id: number;
  name: string;
  image?: string;
};

function Cards() {
  const [countWin, setCountWin] = useState<number>(0);
  const [loosCount, setLooseCount] = useState<number>(0);
  const [selectedCard, setSelectedCard] = useState<SelectedCardType[]>([]);
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
      setLooseCount((prv) => prv + 1);
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
    setLooseCount(0);
  };

  useEffect(() => {
    if (selectedCard.length !== 0) {
      handleCalculateWin();
    }
    if (loosCount >= 2) {
      setTimeout(() => {
        handleRefresh();
      }, 2000);
    }
  }, [selectedCard]);

  useEffect(() => {
    generateRandomData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-gradient-to-r from-[#525252] to-[#3d72b4] p-[35px] ">
      {loosCount >= 3 && (
        <div className="absolute bg-red-500 w-[400px] h-[200px] flex flex-col justify-center items-center text-2xl text-white rounded-[25px] opacity-95">
          <p>GAME OVER !</p>
          <button className="text-2xl text-white my-8" onClick={handleRefresh}>
            Refresh
          </button>
        </div>
      )}
      <div className="w-full h-[80px] flex justify-center items-center ">
        <div className="w-[100px] h-[30px]  flex justify-center items-center rounded-full  bg-[#3835975c]  ">
          <p className="text-1xl text-[#fff] font-bold my-3">
            WIN : {countWin}
          </p>
        </div>
        <div className="ml-[15px] w-[100px] h-[30px]  flex justify-center items-center rounded-full  bg-[#f74242be] ">
          <p className="text-1xl text-[#fff] font-bold my-6">
            Loose : {loosCount}
          </p>
        </div>

        <button
          className=" ml-[15px] text-1xl text-white w-[100px] h-[30px]  flex justify-center items-center rounded-full  bg-[#383597] cursor-pointer "
          onClick={handleRefresh}
        >
          Refresh
        </button>
      </div>

      <div className="w-[910px] h-[540px] rounded-3xl bg-[#070f2b87] flex justify-center items-center flex-wrap mt-2">
        {randomCardData?.map((i, idx) => (
          <div
            key={idx}
            className="w-[200px] cursor-pointer h-[280px] flex justify-center items-center"
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
              className="w-[145px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default Cards;
