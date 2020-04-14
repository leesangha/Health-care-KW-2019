import React, { useState, useCallback, useEffect } from "react";
import "./scss/SignUp.scss";
function SignUp({ history }) {
  const [inputs, setInputs] = useState({
    name: "",
    address: "",
    password: "",
    age: "",
    sex: "",
  });
  const { name, address, password, age } = inputs;

  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      console.log(value);
      setInputs({
        ...inputs,
        [name]: value,
      });
    },
    [inputs]
  );

  const isSuccess = () => {
    setInputs({
      name: "",
      address: "",
      password: "",
      age: "",
      sex: "",
    });
  };

  const onClick = () => {
    fetch("/addUser", {
      method: "POST",
      body: JSON.stringify(inputs),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.text);
        if (data.text !== "success") {
          isSuccess();
          history.push("/");
        }
        else{
          sessionStorage.setItem('number',data.user_no);
          history.push("/research");
        }
      });
  };

  useEffect(() => {
    const isLogin = sessionStorage.getItem("isLogin");
    if (isLogin) {
      history.push("/");
    }
  }, [history]);

  return (
      <div className ="signup-page">
          <div className ="signup-container">
          <img src="/images/maet-logo.png" alt="팀 로고" />
          <input
            name="name"
            placeholder="name"
            onChange={onChange}
            value={name}
          />
          <input
            name="address"
            placeholder="address"
            onChange={onChange}
            value={address}
          />       
          <input
            name="password"
            placeholder="password"
            onChange={onChange}
            value={password}
            type ="password"
          />
          <input
           name="age" 
           placeholder="age" 
           onChange={onChange} 
           value={age} />
          <div className = "select">
          <label>남<input type = "radio" name = "sex" value = "남" onChange = {onChange}/></label>
          <label>여<input type = "radio" name = "sex" value = "여" onChange = {onChange}/></label>
          </div>
      <button onClick={onClick}>제출</button>
        </div>
      
      </div>
  );
}
export default SignUp;
