import styled from "styled-components";
import { useState, useRef } from "react";
import ImageUploader from "../Common/ImageUploader";

const Wrapper = styled.div`
  display: flex;
  margin: 40px 0;
  input {
    width: 30%;
    border: none;
    background: transparent;
    color: ${(props) => props.theme.secondaryColor};
    padding-left: 10px;
    &::placeholder {
      color: ${(props) => props.theme.secondaryColor};
    }

    &:focus {
      outline: none;
    }
  }
  .submit-btn {
    height: 50px;
    width: 50px;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 24px;
    color: ${(props) => props.theme.tertiaryColor};
    margin-left: auto;
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
      <input
        placeholder="連結名稱"
        value={linkItem.name}
        onChange={(e) => setLinkItem({ ...linkItem, name: e.target.value })}
      ></input>
      <input
        placeholder="連結位置"
        value={linkItem.link}
        onChange={(e) => setLinkItem({ ...linkItem, link: e.target.value })}
      ></input>
      <input
        placeholder="連結說明"
        value={linkItem.description}
        onChange={(e) =>
          setLinkItem({ ...linkItem, description: e.target.value })
        }
      ></input>
      <button
        className="submit-btn"
        aria-label="add social link button"
        onClick={(e) => handleSubmit(linkItem)}
      >
        <i className="fas fa-plus"></i>
      </button>
    </Wrapper>
  );
};

export default SocialLinkInput;
