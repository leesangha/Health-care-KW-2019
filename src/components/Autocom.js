import React, { useState, useEffect, useCallback } from "react";
import Autocomplete from "react-autocomplete";
import "./scss/Autocom.scss";

export default function Autocom() {
  const [source, setSource] = useState({
    food_list: [],
  });
  const [inputs, setInputs] = useState({
    food: "",
  });

  const { food } = inputs;
  const { food_list } = source;

  const getFood = () => {
    fetch("search_ingredient/Allfood", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const arr = [];
        data.forEach((elem) => {
          arr.push(elem.food_name);
        });
        console.log(arr);
        setSource({
          ...source,
          food_list: arr,
        });
      });
  };
  useEffect(() => {
    console.log("음식 받아오기");
    getFood();
  }, []);

  const onClick = () => {
    console.log(food);
  };
  return (
    <div>
      <Autocomplete
        style={{ height: 200 }}
        items={food_list}
        getItemValue={(item) => item}
        shouldItemRender={(item, food) =>
          item.toLowerCase().indexOf(food.toLowerCase()) > -1
        }
        value={food}
        onChange={(e) =>
          setInputs({
            food: e.target.value,
          })
        }
        onSelect={(val) => setInputs({ food: val })}
        renderItem={(item, highlighted) => (
          <div
            key={item}
            style={{
              height: 40,
              backgroundColor: highlighted ? "lightblue" : "transparent",
            }}
          >
            {item}
          </div>
        )}
      />
      <button onClick={onClick}>검색</button>
    </div>
  );
}
