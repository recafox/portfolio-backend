import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import ImageUploader from "../Common/ImageUploader";
import StyledInput from "../Common/StyledInput";
import StyledButton from "../Common/StyledButton";

const Wrapper = styled.div`
  display: flex;
  margin: 40px 0;
  justify-content: space-between;
  input {
    padding-left: 10px;
    text-align: left;
    margin: 0 20px;

    &:first-of-type {
      width: 20%;
      flex-shrink: 0;
    }
    &:nth-of-type(2) {
      flex-grow: 2;
    }
    &:nth-of-type(3) {
      width: 30%;
      flex-shrink: 0;
    }
  }

  button {
    align-self: center;
  }
`;

const SocialLinkInput = ({ onSubmit, editingItem }) => {
  const imgUploaderRef = useRef();
  const [linkItem, setLinkItem] = useState({
    imgPath: "",
    name: "",
    description: "",
    link: "",
  });
  const [currentImg, setCurrentImg] = useState(null);

  useEffect(() => {
    if (editingItem) {
      const { imgPath, name, description, link } = editingItem;
      setCurrentImg(editingItem.imgPath);
      setLinkItem({
        imgPath,
        name,
        description,
        link,
      });
    }
  }, [editingItem]);
  const handleSubmit = (item) => {
    onSubmit(item);
    setLinkItem({
      ...linkItem,
      imgPath: "",
      name: "",
      description: "",
      link: "",
    });
    imgUploaderRef.current.reset();
  };

  const onImageUploaded = (imgID) => {
    setLinkItem({ ...linkItem, imgPath: imgID });
  };

  return (
    <Wrapper>
      <ImageUploader
        ref={imgUploaderRef}
        testId={"social-link"}
        onUploaded={onImageUploaded}
        currentImg={currentImg}
      ></ImageUploader>
      <StyledInput
        placeholder="連結名稱"
        value={linkItem.name}
        onChange={(e) => setLinkItem({ ...linkItem, name: e.target.value })}
      ></StyledInput>
      <StyledInput
        placeholder="連結位置"
        value={linkItem.link}
        onChange={(e) => setLinkItem({ ...linkItem, link: e.target.value })}
      ></StyledInput>
      <StyledInput
        placeholder="連結說明"
        value={linkItem.description}
        onChange={(e) =>
          setLinkItem({ ...linkItem, description: e.target.value })
        }
      ></StyledInput>
      <StyledButton
        className="submit-btn"
        aria-label="add social link button"
        onClick={(e) => handleSubmit(linkItem)}
      >
        <i className="fas fa-plus"></i>
      </StyledButton>
    </Wrapper>
  );
};

export default SocialLinkInput;
