import React, { ChangeEvent, useEffect, useState } from "react";
import Header from "../components/Header";
import "./Register.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import getUserNumber from "../components/getUserNumber";

type FileStateType = {
  file: File | null;
  previewURL: string | null;
};

function Register() {
  const userNumber = getUserNumber();

  const register = (regInfo: FormData) => {
    fetch("/file/uploads", {
      method: "post",
      body: regInfo,
    })
      .then((res) => res.json())
      .then((data) => alert(data.msg));
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> & {
      target: { img: { files: FileList } };
    }
  ) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("id", userNumber.toString());
    formData.append("img", e.target.img.files[0]);

    register(formData);
  };

  const [state, setState] = useState<FileStateType>({
    file: null,
    previewURL: null,
  });
  const [preview, setPreview] = useState<JSX.Element | null>(null);

  useEffect(() => {
    if (state.file !== null)
      setPreview(
        <img
          className="preview"
          src={state.previewURL!}
          alt="미리보기 이미지"
        />
      );
  }, [state]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files === null) return;

    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () =>
      setState({
        file: file,
        previewURL: reader.result as string,
      });
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    fetch("/file/history", {
      method: "POST",
      body: JSON.stringify({ userNumber }),
      headers: {
        "Content-Type": "application/json"
      },
    }).then((res: Response) => console.log(res.body));
  }, [userNumber]);

  return (
    <>
      <Header />
      <section className="register-page">
        <article></article>
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
