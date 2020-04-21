import React, { useCallback, useState } from 'react';
import Result from './Result';
import Button from '@material-ui/core/Button'
import "./scss/Research.scss"

function Research({history}) {
    const [inputs, setInputs] = useState({
        search: '',
        isSearch:false,
        list: [],
        string:[],
        source:[],
        correct:'',
    })
    const {search,isSearch,list,string,source,correct} = inputs;
   
    const onChange = useCallback(
        (e) => {
          const { name, value } = e.target;
          setInputs({
            ...inputs,
            [name]: value,
          });

          if(value===''){
            setInputs({
              ...inputs,
              [name]:value,
              isSearch:false
            })  
          }
          
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
          //console.log('arr :' + arr);
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
        const temp = list;
        //console.log('string' + string);
        //console.log(temp);
        setInputs({
          search:'',
          isSearch:false,
          list:[],
          string:string.concat(temp),
          source:source.concat(correct),
        })  
      }
      
    }

    const register = () =>{
      fetch("/register", {
        method: "POST",
        body: JSON.stringify({source:string.join(','), user_no : sessionStorage.getItem('number')}),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then((res) => res.json())
      .then((data) => {

      console.log(data);
      history.push('/');
      })
    }

    return(
        <div>
          <div className="page">
          <img src="/images/maet-logo.png" alt="팀 로고" />
          <div className="back">
            <div className="QnA_Form">
            <h3>1.못먹는 재료가 있나요?</h3>
            <ol>
                <input name ="search" placeholder="재료를 검색하세요" onChange={onChange} value = {search}></input>
                <Button id= "find" 
                onClick = {search_ingredient} 
                variant="contained" 
                color="primary">
                  검색</Button>

                <Button id= "add"
                onClick ={add_ingredient} 
                variant="contained" 
                color="primary">
                  추가</Button>

                <Button id = "submit"
                onClick = {register}  
                variant="contained" 
                color="primary">
                  제출</Button>
               
               <div className="list">
                 {
                 isSearch ===true
                 ?(<label><b>{search}</b>가 포함된 음식 리스트</label>)
                 : (null)
               }
               {
                 isSearch ===true
                 ? (<Result list={list} onRemove ={onRemove}/>)
                 : (<Result list={source} onRemove={dataRemove}/>)
               }
               </div>
                
            </ol>
            </div>
          </div>
        </div>
     </div>
    )
    

}

export default Research;