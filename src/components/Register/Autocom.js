import React, { useState } from "react";
import ReactAutocomplete from "react-autocomplete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./scss/Autocom.scss";

export default function Autocom(props) {
  const [inputs, setInputs] = useState({
    food: "",
  });

  const source = sessionStorage.getItem("foodInfo");
  let foodList;

  if (source !== undefined) {
    foodList = JSON.parse(source).result.map(({ food_no, food_name }) => ({
      food_no,
      food_name,
    }));
  } else {
    props.history.push("/");
  }

  const { food } = inputs;

  const onClick = () => {
    console.log(food);
  };

  const inputProps = {
    placeholder: "Search...",
    style: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
      borderColor: 'black',
      fontSize: 13,
      color: '#262626',
      paddingLeft: 45,
    },
  };

  return (
    <div id="search-box">
      <FontAwesomeIcon icon={faSearch} />
      <ReactAutocomplete
        inputProps={inputProps}
        items={foodList}
        wrapperStyle={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
        menuStyle={{
          borderRadius: '3px',
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
          background: "rgba(255, 255, 255, 0.9)",
          boxSizing: "border-box",
          padding: "2px 10px",
          fontSize: "90%",
          position: "fixed",
          overflow: "auto",
          minWidth: '96%',
          maxHeight: "20%", // TODO: don't cheat, let it flow to the bottom
        }}
        shouldItemRender={(item, value) =>
          item.food_name.toLowerCase().indexOf(value.toLowerCase()) > -1
        }
        getItemValue={(item) => item.food_name}
        renderItem={(item, highlighted) => (
          <div
            key={item.food_no}
            style={{
              display: 'flex',
              alignItems: 'center',
              height: 30,
              backgroundColor: highlighted ? "#eee" : "transparent",
            }}
          >
            {item.food_name}
          </div>
        )}
        value={inputs.food}
        onChange={(e) => setInputs({ food: e.target.value })}
        onSelect={(food) => setInputs({ food })}
      />
    </div>
  );
}
