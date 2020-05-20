import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import getUserNumber from "../components/getUserNumber";
import moment from "moment";

const ONE_WEEK = 7;
const NUTRITION_COUNT = 9;

const backgroundColor = [
  "#FFFFCC",
  "#AFF8DB",
  "#FFABAB",
  "#85E3FF",
  "#97A2FF",
  "#FFFFD1",
  "#F6A6FF",
  "#C4FAF8",
  "#FFCBC1",
];

interface RecommendationType {
  권장나트륨: number;
  권장단백질: number;
  권장당류: number;
  권장열량: number;
  권장지방: number;
  권장콜레스테롤: number;
  권장탄수화물: number;
  권장트랜스지방산: number;
  권장포화지방산: number;
}

interface DataType {
  나트륨: number;
  단백질: number;
  당류: number;
  열량: number;
  지방: number;
  콜레스테롤: number;
  탄수화물: number;
  트랜스지방산: number;
  포화지방산: number;
}

interface DayDataType extends DataType {
  날짜: string;
}

interface WeekDateType extends DataType {
  주차: number;
}

type FetchingDataType = [DayDataType[], WeekDateType[], DataType[]];

function getNutritionAverage(list: DayDataType[]): number[] {
  let average = Array<number>(NUTRITION_COUNT).fill(0);
  let notInputed = 0;
  list.forEach((elements) => {
    const values = Object.values(elements);
    const data: number[] = values.slice(1, values.length);

    if (data[0] === 0) ++notInputed;
    data.forEach((element, index) => {
      average[index] += element;
    });
  });
  return average.map(
    (element) => Math.round((element / (ONE_WEEK - notInputed)) * 100) / 100
  );
}

function grouping<T extends DataType>(
  list: T[]
): [(string | number)[], Array<number[]>] {
  let group: Array<number[]> = Array.from(Array(NUTRITION_COUNT), () => []);
  let diff: (string | number)[] = [];
  list.forEach((elems) => {
    const values = Object.values(elems);
    values.forEach((value, index) => {
      if (index === 0) {
        diff.push(value);
        return;
      }
      group[index - 1].push(value);
    });
  });
  return [diff, group];
}

function makeWeekDataset(list: DayDataType[]) {
  const [date, nutritionIntake] = grouping(list);
  const nutritions = Object.keys(list[0]).slice(1, NUTRITION_COUNT);

  let dataset = [];
  for (let i = 0; i < NUTRITION_COUNT; ++i) {
    dataset.push({
      labels: date.reverse(),
      datasets: [
        {
          label: nutritions[i],
          backgroundColor: backgroundColor[i],
          borderWidth: 2,
          data: [...nutritionIntake[i]],
        },
      ],
    });
  }
  console.log(dataset);
  return dataset;
}

function makeMonthDataset(list: WeekDateType[]) {
  const [week, weekIntake] = grouping(list);
  const month = moment().month() + 1;
  const label = week.map((elem) => `${month}월 ${elem}주차`);
  const nutritions = Object.keys(list[0]).slice(1, NUTRITION_COUNT);

  let dataset = [];
  for (let i = 0; i < NUTRITION_COUNT; ++i) {
    dataset.push({
      labels: label,
      datasets: [
        {
          label: nutritions[i],
          backgroundColor: backgroundColor[i],
          borderWidth: 2,
          data: [...weekIntake[i]],
        },
      ],
    });
  }
  console.log(dataset);
  return dataset;
}

export default function MyStatistics() {
  let history = useHistory();
  const userNumber = getUserNumber();

  if (
    sessionStorage.getItem("recommended_nutrition") === null ||
    userNumber === -1
  ) {
    history.push("/");
  }
  const recommendation: RecommendationType = JSON.parse(
    sessionStorage.getItem("recommended_nutrition")!
  );

  useEffect(() => {
    fetch("/userData/intake_week", {
      method: "POST",
      body: JSON.stringify({ userNumber }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data: FetchingDataType) => {
        getNutritionAverage(data[0]);
        makeWeekDataset(data[0]);
        makeMonthDataset(data[1]);
      });
  }, [userNumber]);

  return <h1>{userNumber}</h1>;
}
