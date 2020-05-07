import React from "react";
import "./scss/FoodAnalysis.scss";
import { CircleLoader } from "react-spinners";
import AnalysisResultList from "./AnalysisResultList";
import {State} from "./FileUpload";

type PropsType = {
  result: {
    label: string
  }[] | null,
  state: State
};

function FoodAnalysis({ result, state }: PropsType) {
  return (
    <div id="prediction-list">
      {state === State.LOADING
        ? (
          <div id="loader-box">
            <CircleLoader />
          </div>
        )
        : state === State.SUCCESS
          ? <AnalysisResultList result={result!} />
          : state === State.NOT_FOOD
            ? <p>음식이 아닙니다.</p>
            : null
      }
    </div>
  );
}

export default FoodAnalysis;
