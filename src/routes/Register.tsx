import React, { useMemo, useState } from "react";
import Header from "../components/Header";
import "./Register.scss";
import getUserNumber from "../components/getUserNumber";
import FileUpload from "../components/FileUpload";
import UserFoodHistory from "../components/UserFoodHistory";

function Register() {
  const userNumber = useMemo(() => getUserNumber(), []);
  const [isUpload, setUploadState] = useState(false);

  return (
    <div className="register-page-container">
      <Header />
      <FileUpload userNumber={userNumber} setUploadState={setUploadState} />
      <UserFoodHistory
        userNumber={userNumber}
        uploadState={[isUpload, setUploadState]}
      />
    </div>
  );
}

export default Register;
