import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { Helmet } from "react-helmet";
import getUserNumber from "../components/getUserNumber";
import "./Statistics.scss";
import { isNullOrUndefined } from "util";
import { noAuto } from "@fortawesome/fontawesome-svg-core";

function Statistics(props) {
  const user_name = JSON.parse(sessionStorage.getItem("info"))[0].user_name;
  const [states, setStates] = useState([]);
  const [null_count,setNull] = useState(0);
  const [averages, setAverages] = useState([]);
  var button = 0;

  //권장 영양성분 recommends 배열에 push
  const recommends = [[],[]]
  const recommends_arr = ["권장열량","권장탄수화물","권장단백질","권장지방","권장당류","권장나트륨","권장콜레스테롤","권장포화지방산","권장트랜스지방산"]
  for(var i=0; i<9; i++)
  {
    recommends[0].push(JSON.parse(sessionStorage.getItem("info"))[0][recommends_arr[i]]);
  }

  useEffect(() => {
    const user_no = getUserNumber();
    
    if (user_no !== -1) {
      fetch("/userData/intake_week", {
        method: "POST",
        body: JSON.stringify({ userNumber: user_no }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        }
      })
        .then((res) => res.json())
        .then((data) => {

          //null_count에 null인 날짜 수 push
          var num=0;
          
          for(var i=0; i<7; i++)
          {
            if(data[i].열량 == null)
              num++;
          }
          setNull(num)

          //averages에 각 평균들 배열로 push
          var arr = []
          var nutri = ["열량","탄수화물","단백질","지방","당류","나트륨","콜레스테롤","포화지방산","트랜스지방산"]
          
          for(var i=0; i<9; i++)
          {
            arr.push(((data[6][nutri[i]] + data[5][nutri[i]] + data[4][nutri[i]] + data[3][nutri[i]] + data[2][nutri[i]] + data[1][nutri[i]] + data[0][nutri[i]])/(7-num)).toFixed(2))
          }
          setAverages(arr)
          
          //states에 차트 데이터 배열로 push
          var nutrition = []
          var back_color = ['#FFFFCC','#AFF8DB','#FFABAB','#85E3FF','#97A2FF','#FFFFD1','#F6A6FF','#C4FAF8','#FFCBC1']
          
          for(var i=0; i<9; i++)
          {
            nutrition.push({
              labels: [data[6].날짜,data[5].날짜,data[4].날짜,data[3].날짜,data[2].날짜,data[1].날짜,data[0].날짜],
              datasets: [
                {
                  label: nutri[i],
                  backgroundColor: back_color[i],
                  borderWidth: 2,
                  data: [data[6][nutri[i]], data[5][nutri[i]], data[4][nutri[i]], data[3][nutri[i]], data[2][nutri[i]], data[1][nutri[i]], data[0][nutri[i]]]
                }
              ]})
          }
          setStates(nutrition)

        })
    }

    
  }, []);


  let click = (e) => {
    switch(e.target.value)
    {
      case "주간":{
        document.getElementById('label1').style.backgroundColor="#454a60";
        document.getElementById('label1').style.color="#fff";
        for(var i = 0; i<states.length; i++)
        {
          document.getElementsByClassName('주간')[i].style.display="inline"
        }
        document.getElementById("title_week").style.display="inline"
        button=0;
        break;
      }
      case "월간":{
        document.getElementById('label1').style.backgroundColor="#fff";
        document.getElementById('label1').style.color="#454a60";

        for(var i = 0; i<states.length; i++)
        {
          document.getElementsByClassName('주간')[i].style.display="none"
        }
        document.getElementById("title_week").style.display="none"
        button=1;
        break;
      }
    }
  }
  return (
    
    <div className="statistics">
      <Header/>
      <div class="radio-items">
		    <div class="col-6">
			    <input id="a1" class="only-sr checked" type="radio" name="temp1" value="주간" onChange={click}/>
			    <label for="a1" id="label1">주간</label>
		    </div>
		    <div class="col-6">
			    <input id="a2" class="only-sr" type="radio" name="temp1" value="월간" onChange={click}/>
			    <label for="a2">월간</label>
		    </div>
	    </div>

      <div id="title_week">
        <h1 style={{marginLeft:250+'px', float:"left",marginTop:1+'em'}}>{user_name} 님의 주간 그래프 <img src="/images/computer.png" width="50" height="50"></img></h1>
        <h1 style={{marginLeft:950+'px',marginTop:1+'em'}}>주간 통계 <img src="/images/organize.png" width="50" height="50"></img></h1>
      </div>

      {states.map((value,index) =>{
      return <div className = "주간" style={{display:'inline'}}>
      <Bar 
      id={index}
      data={states[index]}
      width={800}
      height={250}
      options={{
        responsive: false,
        legend: {
          display: true,
          position: 'top',
          labels: {
            fontSize: 20
          }
        },
        scales: { 
          yAxes: [{ gridLines: { 
            drawBorder: false
          },
            ticks: {
                display: true,
                min: 0
              } 
          }]
        }
      }}
    />
    <Helmet>
      <script>
        document.getElementsByTagName('canvas')[0].style.display="inline";
        document.getElementsByTagName('canvas')[1].style.display="inline";
        document.getElementsByTagName('canvas')[2].style.display="inline";
        document.getElementsByTagName('canvas')[3].style.display="inline";
        document.getElementsByTagName('canvas')[4].style.display="inline";
        document.getElementsByTagName('canvas')[5].style.display="inline";
        document.getElementsByTagName('canvas')[6].style.display="inline";
        document.getElementsByTagName('canvas')[7].style.display="inline";
        document.getElementsByTagName('canvas')[8].style.display="inline";
      </script>
    </Helmet>
    <div className="week_statistics">
    <a style={{fontSize:30}}>
      {value.datasets[0].label}의 주간 평균 : {averages[index]} {recommends[0][0]}
      </a>
    </div>
    
    </div>  })}
    

    </div>
  );

}



export default Statistics;