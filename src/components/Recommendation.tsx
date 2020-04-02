import React, { useEffect, useState } from "react";
import "./scss/Recommendation.scss";
import Food from "./Food";
import { PacmanLoader } from "react-spinners";

function getFoodImage(foodList: Array<number>) {
  let imgSrcList: string[] = [];
  for (let i = 0; i < 6; ++i) {
    const imgSrc = `http://localhost:4002/images/${foodList[i]}.png`;
    imgSrcList.push(imgSrc);
  }
  console.log(imgSrcList);

  return imgSrcList.map((src: string) => <Food key={src} imageSrc={src} />);
}

function Recommendation() {
  const [foodList, setFoodList] = useState<Array<number>>();

  useEffect(() => {
    const sessionInfo = sessionStorage.getItem("info");

    if (sessionInfo !== null) {
      const userInfo: { user_no: number } = JSON.parse(sessionInfo);
      const userNumber = userInfo.user_no;

      fetch("/userData/preference", {
        method: "POST",
        body: JSON.stringify({ userNumber: userNumber }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      })
        .then(req => req.json())
        .then(data => {
          let predictedFoodList: Array<number> = [];
          data.pref.forEach((obj: { food_no: number }) =>
            predictedFoodList.push(obj.food_no)
          );
          setFoodList(predictedFoodList);
        });
    }
  }, []);

  return foodList === undefined ? (
    <div className="loader">
      <PacmanLoader size={20} color={"#646464"} />
    </div>
  ) : (
    <article className="recommendation">
      <h1>이런 음식 어때요? </h1>
      {getFoodImage(foodList)}
    </article>
  );
}

export default Recommendation;
