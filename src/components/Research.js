import React, { useCallback, useState,useReducer } from 'react';


function Research() {
    const [inputs, setInputs] = useState({
        search: '',
    })
    const {search} = inputs;
    const onChange = useCallback(
        (e) => {
          const { name, value } = e.target;
          setInputs({
            ...inputs,
            [name]: value,
          });

        },
        [inputs]
      );

    const onClick = () => {

    }

    return(
        <div>
            <div className="QnA_Form">
            <ol>
                <li>싫어하는 음식이 있나요?</li>

                <li>못먹는 재료가 있나요?</li>
                <input name ="search" placeholder="재료를 검색하세요" onChange={onChange} value = {search}></input>
                <button>검색</button><button>추가</button>
            </ol>
            </div>
        </div>
    )
    

}

export default Research;