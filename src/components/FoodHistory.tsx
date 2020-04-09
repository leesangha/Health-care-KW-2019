import React from "react";
import './scss/Food.scss';

type PropsType = {
  date: string;
  imgSrc: string[];
};

function FoodHistory({ date, imgSrc }: PropsType) {
  const images = (src: string): JSX.Element => {
    return (
      <div className="food">
        <div className="box">
          <img src={src} alt="섭취 이미지" />
        </div>
      </div>
    )
  };

  return (
    <div className="food-container">
      <h2>{date}</h2>
      {imgSrc.map(src => images(src))}
    </div>
  );
}

export default FoodHistory;
