import React from "react";
import { Bar } from "react-chartjs-2";
import { useHistory } from "react-router-dom";
import { DatasetType } from "../../routes/MyStatistics";

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

type PropsType = {
  dataset: DatasetType;
  averageIntake?: number;
};

export default function WeekStatistics({dataset, averageIntake}: PropsType) {
  const history = useHistory();

  if (sessionStorage.getItem("recommended_nutrition") === null) {
    history.push("/");
  }
  const recommendation: RecommendationType = JSON.parse(
    sessionStorage.getItem("recommended_nutrition")!
  );

  return (
    <article id="week-container">
      <Bar data={dataset} />
      <div id="weekly-analysis"></div>
    </article>
  );
}
