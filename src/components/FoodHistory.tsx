import React from "react";
import "./scss/FoodHistory.scss";

type PropsType = {
  date: string;
  imgSrc: string[];
};

function FoodImages({src}: {src: string}) {
  return (
    <div className="taken-food-container">
      <div className="taken-food-box">
        <img src={src} alt="섭취 이미지" />
      </div>
    </div>
  )
}

function FoodHistory({ date, imgSrc }: PropsType) {
  return (
    <div className="history-wrapper">
      <h2>{date.slice(0, 2)}.{date.slice(2, 4)}.{date.slice(4, 6)}.</h2>
      <div className="history">
        {imgSrc.map((src) => <FoodImages key={src} src={src} />)}
      </div>
    </div>
  );
}

export default FoodHistory;
