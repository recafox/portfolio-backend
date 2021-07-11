import axios from "axios";
import { useRef, useState } from "react";
import urls from "../../Constants/urls";
import styled from "styled-components";

const Uploader = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.secondaryColor};
  position: relative;

  input {
    display: none;
  }

  button {
    width: 25px;
    height: 25px;
    position: absolute;
    background-color: ${(props) => props.theme.tertiaryColor};
    color: #fff;
    border: none;
    height: 50%;
    border-radius: 50%;
    bottom: 0;
    right: 0;
    cursor: pointer;
  }
  .preview {
    border-radius: 50%;
    overflow: hidden;
  }
  img {
    height: 100%;
    width: 100%;
  }
`;

const ImageUploader = () => {
  const fileInput = useRef(null);
  const [selected, setSelected] = useState(false);
  const [uploaded, setUploaded] = useState({ status: false, imgId: "" });
  const [error, setError] = useState(false);
  const [image, setImage] = useState(null);

  const handleClick = (e) => {
    e.preventDefault();
    fileInput.current.click();
  };

  const handleOnChange = (e) => {
    setImage(e.target.files[0]);
    setSelected(true);
  };

  const renderErrorMsg = () => {
    if (error) {
      return <p aria-label="error message">error</p>;
    }
  };

  const uploadImage = async (e) => {
    let formData = new FormData();
    formData.append("image", fileInput.current.files[0]);
    try {
      const response = await axios.post(urls.imageURL, formData);
      setUploaded({ status: true, imgId: response.data._id });
      setError(false);
    } catch (e) {
      setError(true);
    }
  };

  const deleteImage = async (e) => {
    try {
      const response = await axios({
        method: "DELETE",
        url: `${urls.imageURL}/${uploaded.imgId}`,
      });
      setSelected(false);
      setUploaded({ status: false, imgId: "" });
      setError(false);
    } catch (e) {
      setError(true);
    }
  };

  const renderPreview = () => {
    if (selected && image) {
      const src = URL.createObjectURL(image);
      return (
        <div className="preview">
          <img src={src} alt="preview-img"></img>
        </div>
      );
    } else {
      return <div data-testid="empty-preview"></div>;
    }
  };

  const renderButton = () => {
    if (selected && !uploaded.status) {
      return (
        <button aria-label="upload image" onClick={(e) => uploadImage(e)}>
          <i className="fas fa-arrow-up"></i>
        </button>
      );
    }

    if (selected && uploaded.status) {
      return (
        <button aria-label="delete image" onClick={(e) => deleteImage(e)}>
          <i className="fas fa-times"></i>
        </button>
      );
    }
    return (
      <button aria-label="select image" onClick={(e) => handleClick(e)}>
        <i className="fas fa-plus"></i>
      </button>
    );
  };

  return (
    <Uploader className="image-uploader">
      {renderPreview()}
      <input
        type="file"
        ref={fileInput}
        data-testid="file-uploader"
        onChange={(e) => handleOnChange(e)}
      ></input>
      {renderErrorMsg()}
      {renderButton()}
    </Uploader>
  );
};

export default ImageUploader;
