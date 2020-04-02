import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTired } from "@fortawesome/free-solid-svg-icons";
import "./scss/Food.scss";

type FoodProps = {
  imageSrc: string;
  num?: number;
};

function Food({ imageSrc, num }: FoodProps) {
  const food_no = imageSrc.split(".")[0].split("/")[2];

  const [inputs, setInputs] = useState({
    user_id: num,
    food_id: food_no,
  });

  const onClick = () => {
    console.log("click event " + num + " " + food_no);
    setInputs({
      user_id: num,
      food_id: food_no,
    });
    //DB 선호도 내리기
    fetch("/hate", {
      method: "POST",
      body: JSON.stringify(inputs),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("선호도 내림 ");
      });
  };

  return (
    <div className="food-container">
      <div className="food">
        <div>
          <img src={imageSrc} alt="foodImage" />
          <button onClick={onClick}>
            <FontAwesomeIcon size="2x" color="rgb(255, 202, 0)" icon={faTired} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Food;
