import React, { useState,useCallback } from 'react';


function Research() {
    const [inputs, setInputs]=useState();
    const onChange = useCallback(e=>{
        const { name, value } = e.target;
        setInputs({
          ...inputs,
          [name]: value,
        });
        console.log(inputs) 
        }
     ,
      [inputs]
    );
    return(
        <div>
            <ol>
                <li>싫어하는 음식이 있나요?</li>

                <li>못먹는 재료가 있나요?</li>
                <input name ="search" placeholder="재료를 검색하세요" onChange={onChange}></input>
            </ol>

        </div>
    )
    

}

export default Research;