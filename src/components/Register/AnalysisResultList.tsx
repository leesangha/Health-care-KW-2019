import React, {useCallback, useEffect, useState} from "react";
import getFoodName from "../getFoodName";

type PropsType = { result: {label: string }[] };
type ResultType = { label: string }[];

type LabelType =
  | "bab"
  | "gaeranmali"
  | "melchi"
  | "dufu"
  | "kongnamul"
  | "musengchae"
  | "kimchi"
  | "sigumchi"
  | number;

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

function convertResult(result: ResultType) {
  return result.map(async (elements) => {
    const label = elements.label;
    const initList = Object.values(Food);

    if (initList.includes(label)) {
      return {
        ...elements,
        label: await getFoodName(Food[label as keyof typeof Food])
      }
    } else {
      return {
        ...elements,
        label: await getFoodName(Number(label))
      }
    }
  })
}

function AnalysisResultList({ result }: PropsType) {
  const [convertedResult, setResult] = useState<ResultType>();

  useEffect(() => {
    const converted = convertResult(result);
    setResult(converted);
  }, []);
  return (
    <ul>
      {convertResult(result).map((label, index) => (
        <li key={index}>{label.then(v => v)}</li>
      ))}
    </ul>
  );
}

export default AnalysisResultList;
