import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";

type FoodInfoType = {
  foodName: string;
  index: number
  onRemove: any;
};

function ListItem({ foodName, index, onRemove }: FoodInfoType) {
  return (
    <>
      <li>
        <div id="list-item">
          {foodName}
          <FontAwesomeIcon icon={faTrashAlt} onClick={() => {
            onRemove(index);
            // console.log(index);
          }} />
        </div>
      </li>
    </>
  );
}

export default ListItem;