import styled from "styled-components";
import { useState, useRef } from "react";
import ImageUploader from "../Common/ImageUploader";
import StyledInput from "../Common/StyledInput";
import StyledButton from "../Common/StyledButton";

const Wrapper = styled.div`
  display: flex;
  margin: 40px 0;
  justify-content: space-between;
  input {
    flex-grow: 2;
    padding-left: 10px;
    text-align: center;
    margin: 0 20px;
  }

  button {
    align-self: center;
  }
`;

const SocialLinkInput = ({ onSubmit }) => {
  const imgUploaderRef = useRef();
  const [linkItem, setLinkItem] = useState({
    imgPath: "",
    name: "",
    description: "",
    link: "",
  });

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
