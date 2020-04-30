import React, { useState, useEffect } from "react";
import Picture from "./Picture";
import getFoodName from "./getFoodName";
import Button from '@material-ui/core/Button';


function number() {
  const Max = 517;
  return Math.round(Math.random(0, Max) * Max);
}

function Random() {
  const [num, setNum] = useState(number());
  const [foodName, setFoodName] = useState();
  const [score, setScore] = useState();


  useEffect(() => {
    getFoodName(num).then((res) => setFoodName(res));
  }, [num]);
  useEffect(() =>{
    console.log(score);
  },[score])
  const onClick = () => {
    setNum(number());
    console.log(score);
    setScore(5);
  };
  
  return (
    <div id="box">
      <h3>2.이 음식을 좋아하시나요?</h3>
      <span id="foodname">{foodName}</span>
      <Picture number={num} setScore ={setScore} score={score}/>
      <Button id="change" onClick={onClick}>
        다른 음식
      </Button>
      <Button id="next" onClick={onClick}>
        next
      </Button>
    </div>
  );
}

export default Random;
