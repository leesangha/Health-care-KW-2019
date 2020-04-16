import React, {useEffect, useState} from "react";
import "../scss/FoodAnalysis.scss";
import { CircleLoader } from "react-spinners";

type PropsType = {
  preview: JSX.Element | null,
  result: {
    label: string
  }[] | null
};

enum State {
  WAITING,
  LOADING,
  SUCCESS,
  NOT_FOOD
}

function FoodAnalysis({ preview, result }: PropsType) {
  const [state, setState] = useState<State>(State.WAITING);

  const submitForm = () => {
    setState(State.LOADING);
  };

  useEffect(() => {
    if (result === null) {
      setState(State.WAITING);
    } else if (result.length === 0) {
      setState(State.NOT_FOOD);
    } else {
      setState(State.SUCCESS);
    }
  }, [result]);

  useEffect(() => {
    setState(State.WAITING);
  }, [preview]);

  return preview === null ? null : (
    <div className="submit-button-wrapper">
      <label>
        {state === State.WAITING ? (
          <i className="fas fa-arrow-right fa-2x" />
        ) : null}
        <input className="input-file" type="submit" onClick={submitForm} />
      </label>
      {state === State.LOADING
        ? (
          <div>
            <CircleLoader />
          </div>
        )
        : state === State.SUCCESS
          ? result?.map(({label}, index) => <p key={index}>{label}</p>)
          : state === State.NOT_FOOD
            ? <p>음식이 아닙니다.</p>
            : null
      }
    </div>
  );
}

export default FoodAnalysis;
