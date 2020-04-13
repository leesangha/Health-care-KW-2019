import React, {useState} from "react";
import "./scss/FoodAnalysis.scss";
import { CircleLoader } from "react-spinners";

type PropsType = {
  preview: JSX.Element | null;
};

enum State {
  WAITING,
  LOADING,
  SUCCESS,
  ERROR,
}

function FoodAnalysis({ preview }: PropsType) {
  const [state, setState] = useState<State>(State.WAITING);

  const submitForm = () => {
    setState(State.LOADING);
  };

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
        : null}
    </div>
  );
}

export default FoodAnalysis;
