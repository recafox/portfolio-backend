import axios from "axios";
import { useRef, useState, useEffect } from "react";
import styled from "styled-components";

const Label = styled.label`
  display: none;
`;

const UploaderWrapper = styled.div`
  width: 60px;
  height: 60px;
  position: relative;
  border-radius: 50%;

  .preview-wrapper {
    height: 100%;
    width: auto;
    border-radius: 50%;
    overflow: hidden;
  }
  img {
    height: 100%;
    width: auto;
  }

  .empty-preview {
    height: 100%;
    width: 100%;
    background-color: ${(props) => props.theme.supportColor};
  }
`;

const UploaderButton = styled.button`
  background: ${(props) => props.theme.primaryColor};
  color: #fff;
  border: none;
  border-radius: 50%;
  height: 32px;
  width: 32px;
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translateX(50%);
  cursor: pointer;
`;

// 狀態: 已有圖片位置, 尚未有圖片位置

const ImageUploader = (props) => {
  const fileInput = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [src, setSrc] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [currentImageID, setCurrentImageID] = useState(null);

  useEffect(() => {
    if (props.imageSrc) {
      setSrc(props.imageSrc);
      setUploaded(true);
    } else {
      setSrc(null);
      setUploaded(false);
    }
  }, [props.imageSrc]);
  const handleFileInput = (e) => {
    if (!e.target.files[0]) {
      return;
    }
    const file = e.target.files[0];
    setSrc(URL.createObjectURL(e.target.files[0]));
    setSelectedFile(file);
  };

  const upload = async (e) => {
    const formData = new FormData();
    formData.append("image", selectedFile);
    const response = await axios.post("/image", formData);
    setUploaded(true);
    setCurrentImageID(response.data._id);

    if (props.onSuccessCallback) {
      props.onSuccessCallback(response.data._id);
    }
  };

  const deleteImg = async (e) => {
    await axios({
      method: "DELETE",
      url: `/image/${currentImageID}`,
    });
    setUploaded(false);
    setSrc(null);
  };

  const select = (e) => {
    fileInput.current.click();
  };

  const renderButton = () => {
    // 若是已經上傳過的圖, 可以刪除
    if (uploaded) {
      return (
        <UploaderButton onClick={(e) => deleteImg(e)} aria-label="delete">
          <i className="fas fa-times"></i>
        </UploaderButton>
      );
    }
    if (src) {
      return (
        <UploaderButton onClick={(e) => upload(e)} aria-label="upload">
          <i className="fas fa-arrow-up"></i>
        </UploaderButton>
      );
    }
    return (
      <UploaderButton aria-label="select" onClick={(e) => select(e)}>
        <i className="fas fa-plus"></i>
      </UploaderButton>
    );
  };

  const renderPreviewImg = () => {
    const content = src ? (
      <img src={`${src}`} alt="preview-img"></img>
    ) : (
      <div className="empty-preview" data-testid="empty-preview"></div>
    );

    return <div className="preview-wrapper">{content}</div>;
  };

  return (
    <UploaderWrapper className="image-uploader">
      {renderPreviewImg()}
      <Label>
        upload
        <input
          type="file"
          role="button"
          aria-label="File Upload"
          onChange={handleFileInput}
          ref={fileInput}
        ></input>
      </Label>
      {renderButton()}
    </UploaderWrapper>
  );
};

export default ImageUploader;
