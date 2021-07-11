import axios from "axios";
import { useRef, useState } from "react";
import urls from "../../Constants/urls";

const ImageUploader = () => {
  const fileInput = useRef(null);
  const [selected, setSelected] = useState(false);
  const [image, setImage] = useState(null);

  const handleClick = (e) => {
    e.preventDefault();
    fileInput.current.click();
  };

  const handleOnChange = (e) => {
    setImage(e.target.files[0]);
    setSelected(true);
  };

  const uploadImage = async (e) => {
    console.log("upload this", fileInput.current.files[0]);
    const response = await axios.post(urls.imageURL, {
      image: fileInput.current.files[0],
    });
    console.log(response);
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
    if (selected) {
      return (
        <button aria-label="upload image" onClick={(e) => uploadImage(e)}>
          <i className="fas fa-arrow-up"></i>
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
      {renderButton()}
    </div>
  );
};

export default ImageUploader;
