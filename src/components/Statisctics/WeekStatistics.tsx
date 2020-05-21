import React, { useState, useCallback, useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { DatasetType } from "../../routes/MyStatistics";
import "./WeekStatistics.scss";

type PropsType = {
  dataset: DatasetType;
  averageIntake: number;
  recommendation: number;
  unit: string;
};

type IntakeDataType = {
  labels: string[];
  datasets: IntakeDatasetType[];
};

type IntakeDatasetType = {
  data: number[];
  backgroundColor: string[];
  hoverBackgroundColor: string[];
};

export default function WeekStatistics({
  dataset,
  averageIntake,
  recommendation,
  unit,
}: PropsType) {
  const [intakeDataset, setIntakeDataset] = useState<IntakeDataType>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    // 모자란 경우
    if (averageIntake < recommendation) {
      const lack = recommendation - averageIntake;
      const data = {
        labels: ["섭취량", "부족량"],
        datasets: [
          {
            data: [averageIntake, lack],
            backgroundColor: [dataset.datasets[0].backgroundColor, "#F6F7FF"],
            hoverBackgroundColor: [
              dataset.datasets[0].backgroundColor,
              "#F6F7FF",
            ],
          },
        ],
      };
      setIntakeDataset(data);
    } else if (averageIntake >= recommendation) {
      const over = averageIntake - recommendation;
      const data = {
        labels: ["초과량", "섭취량"],
        datasets: [
          {
            data: [over, averageIntake],
            backgroundColor: ["#FF8868", dataset.datasets[0].backgroundColor],
            hoverBackgroundColor: [
              "#FF8868",
              dataset.datasets[0].backgroundColor,
            ],
          },
        ],
      };
      setIntakeDataset(data);
    }
  }, [averageIntake, dataset.datasets, recommendation]);

  return (
    <article id="week-container">
      <div id="chart-container" className="week-wrapper">
        <Bar data={dataset} />
      </div>
      <div id="weekly-analysis" className="week-wrapper">
        <Doughnut data={intakeDataset} />
        <p>
          {Math.round(recommendation * 10) / 10}
          {unit}
        </p>
      </div>
    </article>
  );
}
