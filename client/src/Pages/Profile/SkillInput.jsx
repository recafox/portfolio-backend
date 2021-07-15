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

const SkillInput = ({ onSubmit }) => {
  const imgUploaderRef = useRef();
  const [skillItem, setSkillItem] = useState({
    imgPath: "",
    name: "",
    description: "",
  });

  const onImageUploaded = (id, callback) => {
    setSkillItem({ ...skillItem, imgPath: id });
  };

  const handleSubmit = () => {
    onSubmit(skillItem);
    setSkillItem({
      img: "",
      name: "",
      description: "",
    });
    imgUploaderRef.current.reset();
  };

  return (
    <Wrapper>
      <ImageUploader
        ref={imgUploaderRef}
        testId={"skill"}
        onUploaded={onImageUploaded}
      ></ImageUploader>
      <input
        placeholder="技能名稱"
        value={skillItem.name}
        onChange={(e) => setSkillItem({ ...skillItem, name: e.target.value })}
      ></input>
      <input
        placeholder="技能說明"
        value={skillItem.description}
        onChange={(e) =>
          setSkillItem({ ...skillItem, description: e.target.value })
        }
      ></input>
      <button
        className="submit-btn"
        aria-label="add skill button"
        onClick={(e) => handleSubmit()}
      >
        <i className="fas fa-plus"></i>
      </button>
    </Wrapper>
  );
};

export default SkillInput;
