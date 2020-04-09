import React from 'react';


function Search_Result({list, onRemove}){
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
            <b>{item}</b><button onClick ={() => onRemove(item)}>삭제</button> 
        </div>
    )
}


export default Search_Result;