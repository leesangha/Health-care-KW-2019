import React, {ChangeEvent, useEffect, useMemo, useRef, useState} from "react";
import Header from "../components/Header";
import "./Register.scss";
import getUserNumber from "../components/getUserNumber";
import FoodHistory from "../components/FoodHistory";
import RegisterWelcome from "../components/RegisterWelcome";

type FileStateType = {
  file: File | null;
  previewURL: string | null;
};

type UserImageListType = {
  date: string;
  imgSrc: string[];
};

function Register() {
  const userNumber = useMemo(() => getUserNumber(), []);

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

  const formRef = useRef<HTMLFormElement>(null);

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

  const [userImageList, setUserImageList] = useState<UserImageListType[]>([]);

  useEffect(() => {
    fetch("/file/history", {
      method: "POST",
      body: JSON.stringify({ userNumber }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res: Response) => res.json())
      .then((data: UserImageListType[]) => setUserImageList(data.reverse()));
  }, [userNumber]);
  
  const [mouseOver, setMouseOver] = useState<boolean>(false);

  return (
    <div className="register-page-container">
      <Header />
      <form
        ref={formRef}
        className="upload"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <label
          onMouseOver={() => setMouseOver(true)}
          onMouseOut={() => setMouseOver(false)}
        >
          {state.previewURL === null ? (
            <RegisterWelcome mouseOver={mouseOver} />
          ) : null}
          <input
            id="file"
            className="input-file"
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            name="img"
            onChange={onChange}
          />
        </label>
        {/*<input type="submit" value="제출" />*/}
        {preview}
      </form>
      <section className="register-page">
        <article className="history-page">
          {userImageList.length !== 0 ? (
            userImageList.map(({ date, imgSrc }, index) => (
              <FoodHistory key={index} date={date} imgSrc={imgSrc} />
            ))
          ) : (
            <p>등록한 음식이 없어요.</p>
          )}
        </article>
      </section>
    </div>
  );
}

export default Register;
