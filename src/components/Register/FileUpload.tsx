import React, { useCallback, useEffect, useState } from "react";
import RegisterWelcome from "./RegisterWelcome";
import FoodAnalysis from "./FoodAnalysis";

type FileStateType = {
  file: File | null;
  previewURL: string | null;
};

type PropsType = {
  userNumber: number;
  setUploadState: React.Dispatch<React.SetStateAction<boolean>>;
};

type PredictionType =
  | {
      label: string;
    }[]
  | null;

function FileUpload({ userNumber, setUploadState }: PropsType) {
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  const [state, setState] = useState<FileStateType>({
    file: null,
    previewURL: null,
  });
  const [preview, setPreview] = useState<JSX.Element | null>(null);
  const [prediction, setPrediction] = useState<PredictionType>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files === null) return;

    let reader = new FileReader();
    let file = e.target.files[0];

    if (file === undefined) {
      setPreview(null);
      return null;
    }

    reader.onloadend = () =>
      setState({
        file: file,
        previewURL: reader.result as string,
      });
    reader.readAsDataURL(file);
  };

  const register = useCallback((regInfo: FormData) => {
    fetch("/file/uploads", {
      method: "POST",
      body: regInfo,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPrediction(data);
      });
  }, []);

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> & {
      target: { img: { files: FileList } };
    }
  ) => {
    setUploadState(true);

    e.preventDefault();
    const formData = new FormData();

    formData.append("id", userNumber.toString());
    formData.append("img", e.target.img.files[0]);

    register(formData);
  };

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

  return (
    <form
      className="upload"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <label
        onMouseOver={() => setMouseOver(true)}
        onMouseOut={() => setMouseOver(false)}
      >
        {preview === null ? <RegisterWelcome mouseOver={mouseOver} /> : preview}
        <input
          className="input-file"
          type="file"
          accept="image/jpeg,image/png,image/jpg"
          name="img"
          onChange={onChange}
        />
      </label>
      <FoodAnalysis preview={preview} result={prediction} />
    </form>
  );
}

export default FileUpload;
