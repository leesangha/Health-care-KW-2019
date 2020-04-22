import React, { useCallback, useEffect, useState } from "react";
import getFoodName from "../getFoodName";
import Autocom from "./Autocom";
import "./scss/AnalysisResultList.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

type PropsType = { result: { label: string }[] };

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

function AnalysisResultList({ result }: PropsType) {
  const [labels, setLabels] = useState<(string | number)[]>(
    result.map((_result) => _result["label"])
  );

  const convertLabel = useCallback((list: (string | number)[]): Promise<
    string
  >[] => {
    return list.map(
      async (label): Promise<string> => {
        let foodNumber: Food | number;

        foodNumber =
          typeof label === "number"
            ? label
            : Object.values(Food).includes(label)
            ? Food[label as keyof typeof Food]
            : -1;

        if (foodNumber === -1) throw new Error("Unhandled food number error");

        try {
          return getFoodName(foodNumber);
        } catch (err) {
          throw new Error(`Unhandled food name error: ${err}`);
        }
      }
    );
  }, []);

  useEffect(() => {
    const _labels = result.map((_result) => _result["label"]);
    const converted = Promise.all(convertLabel(_labels));
    converted.then((foodNames: string[]) => setLabels(foodNames));
  }, [convertLabel, result]);

  return (
    <div id="list-wrapper">
      <Autocom />
      <div id="list-box">
        <ul>
          {labels.map((label, index) => (
            <li key={index}>
              <div id="list-item">
                {label}
                <FontAwesomeIcon icon={faTrashAlt} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AnalysisResultList;
