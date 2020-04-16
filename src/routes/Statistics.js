import React, { useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { Helmet } from "react-helmet";
import getUserNumber from "../components/getUserNumber";
import "./Statistics.scss";
import { isNullOrUndefined } from "util";

function Statistics(props) {
  const user_name = JSON.parse(sessionStorage.getItem("info"))[0].user_name;
  const [states, setStates] = useState([]);
  // {
  //   label: [],
  //   datasets: [],
  // }
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
          //states[0]에 열량 push
          setStates([
            ...states,
          {
            labels: [data[6].날짜,data[5].날짜,data[4].날짜,data[3].날짜,data[2].날짜,data[1].날짜,data[0].날짜],
            datasets: [
              {
                label: '열량',
                backgroundColor: 'red',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [data[6].열량, data[5].열량, data[4].열량, data[3].열량, data[2].열량, data[1].열량, data[0].열량]
              }
            ]
          }]);
          //states[1]에 탄수화물 push
          setStates([
            ...states,
          {
            labels: [data[6].날짜,data[5].날짜,data[4].날짜,data[3].날짜,data[2].날짜,data[1].날짜,data[0].날짜],
            datasets: [
              {
                label: '탄수화물',
                backgroundColor: 'orange',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [data[6].탄수화물, data[5].탄수화물, data[4].탄수화물, data[3].탄수화물, data[2].탄수화물, data[1].탄수화물, data[0].탄수화물]
              }
            ]
          }]);
        })
    }

    
  }, []);


  let hello = (e) => {
    console.log(states);
    switch(e.target.value)
    {
      case "주간":
        document.getElementsByClassName('주간')[0].style.display="inline"


        break;
      case "월간":
        document.getElementsByClassName('주간')[0].style.display="none"



        break;
    }
  }


  return (
    <div>
      <div class="radio-items">
		    <div class="col-6">
			    <input id="a1" class="only-sr checked" type="radio" name="temp1" value="주간" onChange={hello}/>
			    <label for="a1">주간</label>
		    </div>
		    <div class="col-6">
			    <input id="a2" class="only-sr" type="radio" name="temp1" value="월간" onChange={hello}/>
			    <label for="a2">월간</label>
		    </div>
	    </div>
    <div className = "주간">
      <Bar id="bar"
          data={states[0]}
          width={800}
          height={250}
          options={{
            responsive: false,
            title: {
              display: true,
              text: user_name + ' 님의 주간 통계',
              fontSize: 20
            },
            legend: {
              display: true,
              position: 'top'
            },
            scales: { 
              xAxes: [{ gridLines: { display: true }, }], 
              yAxes: [{ gridLines: { 
                drawBorder: false
              },
                ticks: {
                    display: true, 
                  } 
              }]
            },
            showValue: {
              fontStyle: 'Helvetica',
              fontSize: 20
            }
          }}
        />
        <Helmet>
          <script>
            document.getElementById('bar').style.display="inline"
          </script>
        </Helmet>
        <a>hi</a>
        <Bar id="bar2"
          data={states[1]}
          width={800}
          height={250}
          options={{
            responsive: false,
            title: {
              display: true,
              text: user_name + ' 님의 주간 통계',
              fontSize: 20
            },
            legend: {
              display: true,
              position: 'top'
            },
            scales: { 
              xAxes: [{ gridLines: { display: true }, }], 
              yAxes: [{ gridLines: { 
                drawBorder: false
              },
                ticks: {
                    display: true, 
                  } 
              }]
            },
            showValue: {
              fontStyle: 'Helvetica',
              fontSize: 20
            }
          }}
        />
        <a>hi</a>
        <Helmet>
          <script>
            document.getElementById('bar2').style.display="inline"
          </script>
        </Helmet>
    </div>
    </div>
  );
}



export default Statistics;