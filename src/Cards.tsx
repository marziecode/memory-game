import { CARDS_ITEMS } from "./constants";
import cover from "./assets/cover-img.png";
import { useEffect, useState } from "react";
import vectore1 from "./assets/vectore-1.png";
import vectoreLeft from './assets/vectore-left.png'

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
    if (loosCount >= 4) {
      setTimeout(() => {
        handleRefresh();
      }, 2000);
    }
  }, [selectedCard]);

  useEffect(() => {
    generateRandomData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-gradient-to-r from-[#386f53] to-[#6aaa6e] p-[35px] overflow-hidden ">
      {loosCount >= 4 && (
        <div className="absolute bg-red-500 w-[400px] h-[200px] flex flex-col justify-center items-center text-2xl text-white rounded-[25px] opacity-95">
          <p>GAME OVER !</p>
          <button className="text-2xl text-white my-8" onClick={handleRefresh}>
            Refresh
          </button>
        </div>
      )}
      <div className="w-full h-[80px] flex justify-center items-center ">
        <div className="w-[100px] h-[30px]  flex justify-center items-center rounded-full  bg-[#476e62]  border border-[#26322363] ">
          <p className="text-1xl text-[#fff] font-bold my-3">
            WIN : {countWin}
          </p>
        </div>
        <div className="ml-[15px] w-[100px] h-[30px]  flex justify-center items-center rounded-full  bg-[#f76b83] border border-[#d4d4e063] ">
          <p className="text-1xl text-[#fff] font-bold my-6">
            Loose : {loosCount}
          </p>
        </div>

        <button
          className=" ml-[15px] text-1xl text-white w-[100px] h-[30px]  flex justify-center items-center rounded-full  bg-[#476e62] cursor-pointer hover:bg-[#66d8a6] border border-[#26322363]"
          onClick={handleRefresh}
        >
          Refresh
        </button>
      </div>

      <div className="w-[800px] h-[530px] rounded-3xl bg-[#96e3a244] flex justify-center items-center flex-wrap shadow-2xl	">
        {randomCardData?.map((i, idx) => (
          <div
            key={idx}
            className="w-[200px] cursor-pointer h-[210px] flex justify-center items-center "
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
              className="w-[140px]"
            />
          </div>
        ))}
        <img
          src={vectore1}
          alt=""
          className="w-[100px] absolute right-[265px] bottom-7"
        />
        <img
          src={vectoreLeft}
          alt=""
          className="w-[50px] absolute left-[265px] bottom-7"
        />
      </div>
    </div>
  );
}
export default Cards;
