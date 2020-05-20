import React, { useEffect, useReducer } from "react";
import getUserNumber from "../components/getUserNumber";
import moment from "moment";
import WeekStatistics from "../components/Statisctics/WeekStatistics";

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

function nutritionGrouping(list: DataType[]) {
  let group: Array<number[]> = Array.from(Array(NUTRITION_COUNT), () => []);
  list.forEach((elems) => {
    const values = Object.values(elems);
    values.forEach((value, index) => {
      group[index].push(value);
    });
  });
  return group;
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
  const [date, nutritionIntake] = grouping(list) as [string[], Array<number[]>];
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
  const [week, weekIntake] = grouping(list) as [number[], Array<number[]>];
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

export type DatasetType = {
  labels: (string | number)[];
  datasets: {
    label: string;
    backgroundColor: string;
    borderWidth: number;
    data: number[];
  }[];
}[];

type State = {
  weeklyIntakeAverage: number[];
  weekDataset: DatasetType;
  monthDataset: DatasetType;
  usersDataset: DataType[];
  isWeek: boolean;
};

type Action =
  | {
      type: "SET_AVERAGE";
      averageList: number[];
    }
  | {
      type: "SET_WEEK_DATASET";
      dataset: DatasetType;
    }
  | {
      type: "SET_MONTH_DATASET";
      dataset: DatasetType;
    }
  | {
      type: "TOOGLE_STATE";
      state: boolean;
    }
  | {
      type: "SET_ALL_USER_DATASET";
      dataset: DataType[];
    };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "SET_AVERAGE":
      return {
        ...state,
        weeklyIntakeAverage: action.averageList,
      };
    case "SET_MONTH_DATASET":
      return {
        ...state,
        monthDataset: action.dataset,
      };
    case "SET_WEEK_DATASET":
      return {
        ...state,
        weekDataset: action.dataset,
      };
    case "TOOGLE_STATE":
      return {
        ...state,
        isWeek: !action.state,
      };
    case "SET_ALL_USER_DATASET":
      return {
        ...state,
        usersDataset: action.dataset,
      };
    default:
      throw new Error("Unhandled error");
  }
}

export default function MyStatistics() {
  const userNumber = getUserNumber();
  const [state, dispatch] = useReducer(reducer, {
    weeklyIntakeAverage: [],
    weekDataset: [],
    monthDataset: [],
    usersDataset: [],
    isWeek: true,
  });


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
        dispatch({
          type: "SET_AVERAGE",
          averageList: getNutritionAverage(data[0]),
        });
        dispatch({
          type: "SET_WEEK_DATASET",
          dataset: makeWeekDataset(data[0]),
        });
        dispatch({
          type: "SET_MONTH_DATASET",
          dataset: makeMonthDataset(data[1]),
        });
        dispatch({
          type: "SET_ALL_USER_DATASET",
          dataset: data[2],
        });
      });
  }, [userNumber]);

  useEffect(() => {
    const usersDataset = state.usersDataset;
    if (usersDataset.length !== 0) {
      const myDataset = usersDataset[userNumber];
      const myValue = Object.values(myDataset);
      console.log(myValue);

      const nutritions = nutritionGrouping(usersDataset);
      nutritions.forEach((elems) => elems.sort((a, b) => b - a));

      const rank = nutritions.map(
        (elems, index) => elems.findIndex((elem) => elem === myValue[index]) + 1
      );
    }
  }, [state.usersDataset, userNumber]);

  useEffect(() => {
    console.log(state.weekDataset);
  }, [state.weekDataset]);

  return state.weekDataset.map((data, index) => {
    return <WeekStatistics key={index} dataset={data} />
  });
}
