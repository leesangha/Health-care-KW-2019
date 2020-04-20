import React from 'react';


function Result({list, onRemove}){
    return (
        <div>
            {list.map((item, index) =>(
                <Item item={item} key ={index} onRemove={onRemove}/>
            ))}
        </div>
    )
}
function Item({item,k, onRemove}){
    return(
        <div>
          <b>{item}</b><button id="remove" onClick ={() => onRemove(item)}>x</button> 
        </div>
    )
}


export default Result;