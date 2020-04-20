import React ,{useState,useEffect,useCallback} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import "./scss/Autocom.scss"
export default function Autocom() {

    const [source, setSource]= useState({
        food_list:[],
    });
    const [inputs, setInputs] = useState({
        food:'',
    })

    const {food} =inputs;
    const {food_list} = source;
  
    const getFood =() => {
        fetch("search_ingredient/Allfood", {
            method: "POST",
            body: JSON.stringify({}),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }).then(res => res.json())
          .then( (data) => {
            const arr=[];
            data.forEach(elem => {
              arr.push(elem.food_name);
            });
            console.log(arr);
            setSource({
            ...source,
            food_list:arr,
            })  

            });
    }
    useEffect( () => {
        console.log('음식 받아오기');
        getFood();
    },[])

 

    return(
        <div style={{width:300, height:150}}>
           <Autocomplete
            id="free-solo-demo"
            freeSolo
            Popper
            options={food_list}
            renderInput={(params) => (
          <TextField {...params} label="음식을 입력하세요" margin="normal" variant="outlined" />
        )}
      />
           
        </div>
    )

}

