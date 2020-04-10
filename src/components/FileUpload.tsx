import React, {
  ChangeEvent, useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import RegisterWelcome from "./RegisterWelcome";

type FileStateType = {
  file: File | null;
  previewURL: string | null;
};

function FileUpload({ userNumber }: { userNumber: number }) {
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  const [state, setState] = useState<FileStateType>({
    file: null,
    previewURL: null,
  });
  const [preview, setPreview] = useState<JSX.Element | null>(null);
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
    formRef.current?.submit();
  };

  const register = useCallback((regInfo: FormData) => {
    fetch("/file/uploads", {
      method: "post",
      body: regInfo,
    })
      .then((res) => res.json())
      .then((data) => alert(data.msg));
  }, []);

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
          className="input-file"
          type="file"
          accept="image/jpeg,image/png,image/jpg"
          name="img"
          onChange={onChange}
        />
      </label>
      <input
        className="input-file"
        type="submit"
        value="제출"
      />
      {preview}
    </form>
  );
}

export default FileUpload;
