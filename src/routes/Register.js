import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "./Register.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

function Register(props) {
  const register = (regInfo) => {
    fetch("/uploads", {
      method: "post",
      body: regInfo,
    })
      .then((res) => res.json())
      .then((data) => alert(data.msg));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    const userNumber = JSON.parse(sessionStorage.getItem("info"))[0].user_no;

    formData.append("id", userNumber);
    formData.append("img", e.target.img.files[0]);

    register(formData);
  };

  const [state, setState] = useState({
    file: "",
    previewURL: "",
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (state.file !== "")
      setPreview(
        <img className="preview" src={state.previewURL} alt="미리보기 이미지" />
      );
  }, [state]);

  const onChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () =>
      setState({
        file: file,
        previewURL: reader.result,
      });
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Header />
      <section className="register-page">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <h1>파일 업로드</h1>
          <input
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            name="img"
            onChange={onChange}
          />
          <input type="submit" value="제출" />
          <br />
          {preview}
        </form>
        <FontAwesomeIcon
          className="test"
          icon={faPlusCircle}
          size="3x"
          color="red"
        />
      </section>
    </>
  );
}

export default Register;
