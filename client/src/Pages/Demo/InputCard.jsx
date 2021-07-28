import styled from "styled-components";
import StyledInput from "../Common/StyledInput";
import StyledTextarea from "../Common/StyledTextarea";
import StyledButton from "../Common/StyledButton";
import { useState, useEffect } from "react";

const Card = styled.div`
  border: 2px solid ${(props) => props.theme.secondaryColor};
  position: relative;
  padding: 15px;

  label,
  textarea {
    display: block;
  }

  textarea {
    width: 100%;
    height: 150px;
    resize: none;
  }

  label {
    margin-bottom: 20px;

    input {
      margin-left: 20px;
      width: 50%;
    }
  }

  button {
    position: absolute;
    top: 15px;
    right: 15px;
  }
`;

const InputCard = ({ onSubmit, item, isEditing }) => {
  const [name, setName] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [demoLink, setDemoLink] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (item) {
      setName(item.name);
      setGithubLink(item.githubLink);
      setDemoLink(item.demoLink);
      setDescription(item.description);
    }
  }, [item]);

  const renderIcon = () => {
    if (isEditing) {
      return <i className="fas fa-pen"></i>;
    }
    return <i className="fas fa-plus"></i>;
  };

  const handleSubmit = function () {
    const submitObject = { name, githubLink, demoLink, description };
    if (isEditing) {
      onSubmit({ id: item._id, ...submitObject });
    } else {
      onSubmit({ name, githubLink, demoLink, description });
    }
    setName("");
    setGithubLink("");
    setDemoLink("");
    setDescription("");
  };

  return (
    <Card>
      <label>
        demo名稱
        <StyledInput
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></StyledInput>
      </label>
      <label>
        github link
        <StyledInput
          type="text"
          value={githubLink}
          onChange={(e) => setGithubLink(e.target.value)}
        ></StyledInput>
      </label>
      <label>
        demo連結
        <StyledInput
          type="text"
          value={demoLink}
          onChange={(e) => setDemoLink(e.target.value)}
        ></StyledInput>
      </label>
      <StyledTextarea
        placeholder="demo說明"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></StyledTextarea>
      <StyledButton aria-label="submit demo" onClick={handleSubmit}>
        {renderIcon()}
      </StyledButton>
    </Card>
  );
};

export default InputCard;
