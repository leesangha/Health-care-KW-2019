import React ,{useState} from 'react';

function number(){
    const Max = 517
return Math.round(Math.random(0,Max) * Max);
}

function Random() {
    const [num, setNum] = useState(number());
    const onClick= () =>{
        const temp =number();
        setNum(temp);
    }
    return (
        <div>
            <h3>2.못먹는 음식이 있나요?</h3>
            <span>{num}</span>
            <button onClick={onClick}>새 번호</button>
            
        </div>
    )
} 

export default Random;
