import axios from "axios";
import { useRef, useState } from "react";
import urls from "../../Constants/urls";

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
        <div>
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
    <div>
      {renderPreview()}
      <input
        type="file"
        ref={fileInput}
        data-testid="file-uploader"
        onChange={(e) => handleOnChange(e)}
      ></input>
      {renderErrorMsg()}
      {renderButton()}
    </div>
  );
};

export default ImageUploader;
