import axios from "axios";
import { useRef, useState } from "react";

// 狀態: 已有圖片位置, 尚未有圖片位置

const ImageUploader = (props) => {
  const fileInput = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [src, setSrc] = useState(props.imageSrc ? props.imageSrc : null);
  const [uploaded, setUploaded] = useState(props.imageSrc ? true : false);
  const [currentImageID, setCurrentImageID] = useState(null);
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setSrc(URL.createObjectURL(e.target.files[0]));
    setSelectedFile(file);
  };

  const upload = async (e) => {
    const formData = new FormData();
    formData.append("image", selectedFile);
    const response = await axios.post("/image", formData);

    if (props.onSuccessCallback) {
      props.onSuccessCallback(response.data._id);
      setUploaded(true);
      setCurrentImageID(response.data._id);
    }
  };

  const deleteImg = async (e) => {
    const response = await axios({
      method: "DELETE",
      url: `/image/${currentImageID}`,
    });
    setUploaded(false);
    setSrc(null);
    console.log(response, "deleted");
  };

  const select = (e) => {
    fileInput.current.click();
  };

  const renderButton = () => {
    // 若是已經上傳過的圖, 可以刪除
    if (uploaded) {
      return <button onClick={(e) => deleteImg(e)}>Delete</button>;
    }
    if (src) {
      return <button onClick={(e) => upload(e)}>Upload</button>;
    }
    return <button onClick={(e) => select(e)}>Select</button>;
  };

  return (
    <div className="image-uploader">
      <img src={src}></img>
      <input type="file" onChange={handleFileInput} ref={fileInput}></input>
      {renderButton()}
    </div>
  );
};

export default ImageUploader;
