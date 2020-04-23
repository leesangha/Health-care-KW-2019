import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { Helmet } from "react-helmet";
import getUserNumber from "../components/getUserNumber";
import "./Statistics.scss";
import { isNullOrUndefined } from "util";
import { noAuto } from "@fortawesome/fontawesome-svg-core";
import { Z_BLOCK } from "zlib";

function Statistics(props) {
  const user_no = getUserNumber();
  const user_name = JSON.parse(sessionStorage.getItem("info"))[0].user_name;
  const [states, setStates] = useState([]);
  const [monthStates,setMonthStates] = useState([]);
  const [null_count,setNull] = useState(0);
  const [averages, setAverages] = useState([]);
  const [allUser,setAllUser] = useState([]);
  let button = 0;

  let nutri = ["열량","탄수화물","단백질","지방","당류","나트륨","콜레스테롤","포화지방산","트랜스지방산"]
  //권장 영양성분 recommends 배열에 push
  const recommends = []
  const recommends_arr = ["권장열량","권장탄수화물","권장단백질","권장지방","권장당류","권장나트륨","권장콜레스테롤","권장포화지방산","권장트랜스지방산"]
  const back_color = ['#FFFFCC','#AFF8DB','#FFABAB','#85E3FF','#97A2FF','#FFFFD1','#F6A6FF','#C4FAF8','#FFCBC1']
  const unit = ['kcal','g','g','g','g','mg','mg','g','g']
  for(var i=0; i<9; i++)
  {
    recommends.push(JSON.parse(sessionStorage.getItem("info"))[0][recommends_arr[i]]);
  }

  useEffect(() => {

    
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
        //data에 2차원 배열로 data[0]에는 주간 data, data[1]에는 월간 data
        .then((data) => {
          console.log(data)
          //null_count에 null인 날짜 수 push
          var num=0;
          
          for(var i=0; i<7; i++)
          {
            if(data[0][i].열량 == null)
              num++;
          }
          setNull(num)

          //averages에 각 평균들 배열로 push
          var arr = []
          
          for(var i=0; i<9; i++)
          {
            arr.push(((data[0][6][nutri[i]] + data[0][5][nutri[i]] + data[0][4][nutri[i]] + data[0][3][nutri[i]] + data[0][2][nutri[i]] + data[0][1][nutri[i]] + data[0][0][nutri[i]])/(7-num)).toFixed(2))
          }
          setAverages(arr)
          
          //states에 차트 데이터 배열로 push
          var nutrition = []
          for(var i=0; i<9; i++)
          {
            nutrition.push({
              labels: [data[0][6].날짜,data[0][5].날짜,data[0][4].날짜,data[0][3].날짜,data[0][2].날짜,data[0][1].날짜,data[0][0].날짜],
              datasets: [
                {
                  label: nutri[i],
                  backgroundColor: back_color[i],
                  borderWidth: 2,
                  data: [data[0][6][nutri[i]], data[0][5][nutri[i]], data[0][4][nutri[i]], data[0][3][nutri[i]], data[0][2][nutri[i]], data[0][1][nutri[i]], data[0][0][nutri[i]]]
                }
              ]})
          }
          setStates(nutrition)

          //monthStates에 차트 데이터 배열로 push

          var month = new Date().getMonth()+1;
          var nutrition = []
          for(var i=0; i<9; i++)
          {
            nutrition.push({
              labels: [month+'월 '+data[1][0].주차+'주차',month+'월 '+data[1][1].주차+'주차',month+'월 '+data[1][2].주차+'주차',month+'월 '+data[1][3].주차+'주차',month+'월 '+data[1][4].주차+'주차'],
              datasets: [
                {
                  label: nutri[i],
                  backgroundColor: back_color[i],
                  borderWidth: 2,
                  data: [data[1][0][nutri[i]], data[1][1][nutri[i]], data[1][2][nutri[i]], data[1][3][nutri[i]], data[1][4][nutri[i]]]
                }
              ]})
          }
          setMonthStates(nutrition)

          setAllUser(data[2])

        })
    }

    
  }, []);

//=================== 주간 / 월간 버튼 클릭 이벤트 =====================
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
        for(var i = 0; i<monthStates.length; i++)
        {
          document.getElementsByClassName('월간')[i].style.display="none"
        }

        document.getElementById("title_week").style.display="inline"
        button=0;

        document.getElementById('title_month').style.display="none";
        break;
      }
      case "월간":{
        document.getElementById('label1').style.backgroundColor="#fff";
        document.getElementById('label1').style.color="#454a60";

        for(var i = 0; i<states.length; i++)
        {
          document.getElementsByClassName('주간')[i].style.display="none"
        }
        for(var i = 0; i<monthStates.length; i++)
        {
          document.getElementsByClassName('월간')[i].style.display="inline"
        }

        document.getElementById("title_week").style.display="none"
        button=1;
        
        document.getElementById('title_month').style.display="inline";


        break;
      }
    }
  }
//===============================================================

//======================통계 페이지 오른쪽 파트==========================
  let dif_a = 0;
  let a = []
  let b = []
  let ranking = []

  for(var i=0; i<9; i++)
  {
    //nutri[i]에 해당하는 영양성분 모든 유저들꺼를 다 가져와서 all_user 배열에 push
    var all_user= []
    for(var userNo = 0; userNo<allUser.length; userNo++)
    {
      all_user.push(allUser[userNo][nutri[i]])
    }
    //ranking 배열에 해당하는 영양성분 순위 차례로 저장
    var sorted = all_user.slice().sort(function(a,b){return b-a})
    var ranks = all_user.slice().map(function(v){ return sorted.indexOf(v)+1 });
    ranking.push(ranks[user_no])

    dif_a = (averages[i]-recommends[i]).toFixed(2);
    var wid_a = (averages[i]/recommends[i]) * 350

    //섭취한 평균이 더 낮을 경우 ==> 권장량 충족 못한 경우
    if(dif_a < 0)
    {
      a.push((
      <div>
        <div style={{position:"relative",left:30+'px',height:"auto"}}><a style={{fontSize:20+'px',marginLeft:290+'px'}}>권장량</a></div>
        <div style={{backgroundColor:back_color[i],position:"relative", zIndex:2, height:30+'px',width:wid_a+'px'}}></div>
        <div style={{backgroundColor:"#D0D3D4",position:"relative", bottom:30+'px',zIndex:1,height:30+'px'}}></div>
        <div style={{position:"relative",bottom:40+'px',height:"auto"}}><a style={{fontSize:20+'px'}}>0{unit[i]}</a><a style={{fontSize:20+'px',marginLeft:320-unit[i].length*15+'px'}}>{recommends[i].toFixed()+unit[i]}</a></div>
        <div style={{position: "relative",bottom:40+'px',height:"auto",fontSize:20+'px'}}><a>평균 섭취량 : {averages[i]}{unit[i]}</a></div>
        <div style={{position: "relative",bottom:30+'px',fontSize:25+'px',height:"auto"}}><a>{Math.abs(dif_a)}{unit[i]} 부족해요!</a></div>
      </div>
      ))
    }
    else
    {
      wid_a = 350
      a.push((
        <div>
          <div style={{position:"relative",left:30+'px',height:"auto"}}><a style={{fontSize:20+'px',marginLeft:290+'px'}}>권장량</a></div>
          <div style={{backgroundColor:back_color[i],position:"relative", zIndex:2, height:30+'px',width:wid_a+'px'}}></div>
          <div style={{backgroundColor:"#D0D3D4",position:"relative", bottom:30+'px',zIndex:1,height:30+'px'}}></div>
          <div style={{position:"relative",bottom:40+'px',height:"auto"}}><a style={{fontSize:20+'px'}}>0{unit[i]}</a><a style={{fontSize:20+'px',marginLeft:320-unit[i].length*15+'px'}}>{recommends[i].toFixed()+unit[i]}</a></div>
          <div style={{position: "relative",bottom:40+'px',height:"auto",fontSize:20+'px'}}><a>평균 섭취량 : {averages[i]}{unit[i]}</a></div>
          <div style={{position: "relative",bottom:30+'px',fontSize:25+'px',height:"auto"}}><a>{Math.abs(dif_a)}{unit[i]} 초과됐어요!</a></div>
        </div>
        ))
    }

    b.push((
      <div>
        <a>{allUser.length + 1}명 중 {ranking[i]}등</a>
      </div>
    ))
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
        <h1 className="그래프"> 주간 그래프 <img src="/images/computer.png" width="50" height="50"></img></h1>
        <h1 className="통계"> 주간 통계 <img src="/images/organize.png" width="50" height="50"></img></h1>
      </div>

      <div id="title_month" style={{display:"none"}}>
        <h1 className="그래프"> {new Date().getMonth()+1}월 그래프 <img src="/images/computer.png" width="50" height="50"></img></h1>
        <h1 className="통계"> 나의 {new Date().getMonth()+1}월 순위는 ? <img src="/images/ranking.png" width="50" height="50"></img></h1>
        <a style={{fontSize:"15px"}}>※주의※ 높은 순위가 좋은 것은 아님 </a>
      </div>

      {states.map((value,index) =>{
      return <div className = "주간">
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
      {a[index]}
      </a>
    </div>
    
    </div>  })}

    {/* ----------------------월간------------------------- */}

    {monthStates.map((value,index) =>{
      return <div className = "월간" style={{display:"none"}}>
      <Bar 
      id={index}
      data={monthStates[index]}
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
          xAxes:[{
            ticks:{
              fontSize : 20
            }
          }],
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
        document.getElementsByTagName('canvas')[9].style.display="inline";
        document.getElementsByTagName('canvas')[10].style.display="inline";
        document.getElementsByTagName('canvas')[11].style.display="inline";
        document.getElementsByTagName('canvas')[12].style.display="inline";
        document.getElementsByTagName('canvas')[13].style.display="inline";
        document.getElementsByTagName('canvas')[14].style.display="inline";
        document.getElementsByTagName('canvas')[15].style.display="inline";
        document.getElementsByTagName('canvas')[16].style.display="inline";
        document.getElementsByTagName('canvas')[17].style.display="inline";
      </script>
    </Helmet>
    <div className="week_statistics">
    <a style={{fontSize:30}}>
      {/* =========b로 수정============ */}
      {b[index]}                                               
      </a>
    </div>
    
    </div>  })}
    
    </div>
  );

}



export default Statistics;