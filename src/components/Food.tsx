import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTired, faGrinHearts } from "@fortawesome/free-solid-svg-icons";
import "./scss/Food.scss";
import getUserNumber from "./getUserNumber";

type FoodProps = {
  imageSrc: string;
  foodNumber: number;
};

type FoodInfoType = {
  result: { food_name: string }[]
}

const init = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  }
};

function getFoodInfo(): Promise<FoodInfoType> {
  return new Promise((resolve, reject) => {
    fetch("/food/name", init)
      .then((res: Response) => res.json())
      .then((data: FoodInfoType) => {
        sessionStorage.setItem("foodInfo", JSON.stringify(data));
        resolve(data);
      })
      .catch((err: Error) => reject(err));
  })
}

function Food({ imageSrc, foodNumber }: FoodProps) {
  // const food_no = imageSrc.split(".")[0].split("/")[2];
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  const [foodName, setFoodName] = useState<string>();
  const info = {
    userNumber: getUserNumber(),
    foodNumber,
  };

  const like = () => {
    fetch("/food/like", {
      ...init,
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("선호도 올림.");
      });
  };

  const dislike = () => {
    //DB 선호도 내리기
    fetch("/food/dislike", {
      ...init,
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("선호도 내림 ");
      });
  };

  const getFoodName = useCallback(async () => {
    let foodInfo: string | null = sessionStorage.getItem("foodInfo");

    let _foodInfo: FoodInfoType =
      foodInfo === null ? await getFoodInfo() : JSON.parse(foodInfo);

    setFoodName(_foodInfo.result[foodNumber].food_name);
  }, [foodNumber]);

  useEffect(() => {
    getFoodName()
      .catch(e => console.error(e));
  }, [getFoodName]);

  return (
    <div className="food-container">
      <div className="food">
        <div className="box">
          {mouseOver ? <p>{foodName}</p> : null}
          <img
            src={imageSrc}
            alt="foodImage"
            onMouseOver={() => setMouseOver(true)}
            onMouseOut={() => setMouseOver(false)}
          />
          <div>
            <button className="like-button" onClick={like}>
              <FontAwesomeIcon
                size="2x"
                color="rgb(255, 202, 0)"
                icon={faGrinHearts}
              />
            </button>
            <button className="dislike-button" onClick={dislike}>
              <FontAwesomeIcon
                size="2x"
                color="rgb(255, 202, 0)"
                icon={faTired}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Food;
