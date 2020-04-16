import React, { useMemo } from "react";
import Header from "../components/Header";
import "./Register.scss";
import getUserNumber from "../components/getUserNumber";
import FileUpload from "../components/FileUpload";
import UserFoodHistory from "../components/UserFoodHistory";

function Register() {
  const userNumber = useMemo(() => getUserNumber(), []);

  return (
    <div className="register-page-container">
      <Header />
      <FileUpload userNumber={userNumber} />
      <UserFoodHistory userNumber={userNumber} />
    </div>
  );
}

export default Register;
