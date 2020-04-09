import React, { useCallback, useState } from 'react';
import Search_Result from './Search_Result';

function Research() {
    const [inputs, setInputs] = useState({
        search: '',
        isSearch:false,
        list: [],
        source:[],
        correct:'',
    })
    const {search,isSearch,list,source,correct} = inputs;
    // const imgSrc = `http://localhost:4002/images/${foodList[i]}.png`;
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
      const onRemove = (item) =>{
          console.log(`삭제 ${item}`);
          setInputs({
            ...inputs,
            list:list.filter(elem => elem !==item),
          })
        }
      
        const dataRemove =(item)=>{
          console.log(`삭제합니다 ${item}`);
          setInputs({
            ...inputs,
            source:source.filter(elem =>elem !==item),
          })
        }

    const search_ingredient = () => {
      console.log(search);
      fetch("/search_ingredient", {
        method: "POST",
        body: JSON.stringify({search:search}),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const arr=data.map(elem => elem.food_name);
          console.log('arr :' + arr);
          setInputs({
          ...inputs,
          isSearch:true,
          list:arr,
          correct:search,
          })
          //food_name 배열 만들기 
          
        });

    }

    const add_ingredient = () =>{

      const arr = source.filter(item => correct ===item);

      if(arr !==[]){
        console.log('동작');
        setInputs({
          search:'',
          isSearch:false,
          list:[],
          source:source.concat(correct),
        })  
      }
      
    }

    const register = () =>{
      fetch("/", {
        method: "POST",
        body: JSON.stringify({source:source}),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then((res) => res.json())
      .then((data) => {
      console.log(data);
      })
    }

    return(
        <div>
            <div className="QnA_Form">
            <ol>
                <li>못먹는 재료가 있나요?</li>
                <input name ="search" placeholder="재료를 검색하세요" onChange={onChange} value = {search}></input>
                <button onClick = {search_ingredient}>검색</button><button onClick ={add_ingredient}>추가</button>
                <button onClick = {register}>제출</button>
               
               {
                 isSearch ===true
                 ? (<Search_Result list={list} onRemove ={onRemove}/>)
                 : (<Search_Result list={source} onRemove={dataRemove}/>)
               }
                
            </ol>
            </div>
        </div>
    )
    

}

export default Research;