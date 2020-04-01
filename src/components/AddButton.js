import React from "react";
import "./scss/AddButton.scss";

// href 추가되야함.
function AddButton() {
  const onClick = () => {
    console.log("onClick");
  };
  return (
    <div className="add-button">
      <a className="float" id="menu-share">
        <i className="fa fa-share my-float" />
      </a>
      <ul>
        <li>
          <a href="/register">
            <i className="fa fa-camera my-float" onClick={onClick} />
          </a>
        </li>
        <li>
          <a>
            <i className="fas fa-utensils my-float" onClick={onClick} />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default AddButton;
