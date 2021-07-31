import styled from "styled-components";
import { useState, useRef } from "react";
import ImageUploader from "../Common/ImageUploader";
import StyledButton from "../Common/StyledButton";
import StyledInput from "../Common/StyledInput";
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 40px 0;
  input {
    padding-left: 10px;
    text-align: left;
    margin: 0 20px;

    &:first-of-type {
      width: 20%;
    }

    &:last-of-type {
      flex-grow: 2;
    }
  }

  button {
    align-self: center;
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
      <StyledInput
        placeholder="技能名稱"
        value={skillItem.name}
        onChange={(e) => setSkillItem({ ...skillItem, name: e.target.value })}
      ></StyledInput>
      <StyledInput
        placeholder="技能說明"
        value={skillItem.description}
        onChange={(e) =>
          setSkillItem({ ...skillItem, description: e.target.value })
        }
      ></StyledInput>
      <StyledButton
        className="submit-btn"
        aria-label="add skill button"
        onClick={(e) => handleSubmit()}
      >
        <i className="fas fa-plus"></i>
      </StyledButton>
    </Wrapper>
  );
};

export default SkillInput;
