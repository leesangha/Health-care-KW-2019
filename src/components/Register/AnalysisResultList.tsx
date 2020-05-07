import React, { useCallback, useEffect, useState } from "react";
import getFoodName from "../getFoodName";
import Autocom from "./Autocom";
import "./scss/AnalysisResultList.scss";
import ListItem from "./ListItem";

type PropsType = {
  result: { label: string | number }[]
};

enum Food {
  bab = 21,
  gaeranmali = 241,
  melchi = 282,
  dufu = 295,
  kongnamul = 332,
  musengchae = 345,
  kimchi = 516,
  sigumchi = 517,
}

type FoodInfoType = {
  foodNumber: number | null;
  foodName: string;
};

function resultLabelConverter(foodInfoList: { label: string | number }[]): FoodInfoType[] {
  return foodInfoList.map(({ label }) => {
    const foodNumber =
      typeof label === "number"
        ? label
        // else "string"
        : Object.values(Food).includes(label)
          ? Food[label as keyof typeof Food]
          : -1;

    if (foodNumber === -1) throw new Error("Unhandled food number error");

    return {
      foodNumber,
      foodName: "",
    };
  })
}

function AnalysisResultList({ result }: PropsType) {
  const [foodInfo, modifyFoodInfo]
    = useState<FoodInfoType[]>(resultLabelConverter(result));

  const convertLabel = useCallback(
    (list: FoodInfoType[]): Promise<FoodInfoType>[] => {
      return list.map(
        async (foodInfo): Promise<FoodInfoType> => {
          const { foodNumber } = foodInfo;
          try {
            return {
              ...foodInfo,
              foodName: await getFoodName(foodNumber!)
            }
          } catch (err) {
            throw new Error(`Unhandled food name error: ${err}`);
          }
        }
      );
    }, []);

  useEffect(() => {
    const _foodInfo = resultLabelConverter(result);
    const converted = Promise.all(convertLabel(_foodInfo));

    converted.then((res: FoodInfoType[]) => modifyFoodInfo(res));
  }, [convertLabel, result]);

  const removeItem = useCallback((itemIndex: number) => {
    modifyFoodInfo(
      foodInfo.filter((info, index) => itemIndex !== index)
    )
  }, [foodInfo]);

  useEffect(() => {
    console.log("foodInfo is Updated!");
  }, [foodInfo]);

  return (
    <div id="list-wrapper">
      <Autocom
        foodInfo={foodInfo}
        modifyFoodInfo={modifyFoodInfo}
      />
      <button onClick={() => console.log(foodInfo)} />
      <div id="list-box">
        <ul>
          {foodInfo.map(({ foodNumber, foodName }, index) => (
            <ListItem
              key={index}
              index={index}
              foodName={foodName}
              onRemove={removeItem}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AnalysisResultList;
