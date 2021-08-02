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

const Tag = styled.div`
  display: inline-flex;
  border: 1px solid black;
  padding: 3px 10px;
  margin-right: 10px;
  margin-bottom: 10px;

  i {
    margin-left: 10px;
    &:hover {
      color: ${(props) => props.theme.secondaryColor};
      cursor: pointer;
    }
  }
`;

const InputCard = ({ onSubmit, item, isEditing }) => {
  const [name, setName] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [demoLink, setDemoLink] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");

  useEffect(() => {
    if (item) {
      setName(item.name);
      setGithubLink(item.githubLink);
      setDemoLink(item.demoLink);
      setDescription(item.description);
      setTags(item.tags);
    }
  }, [item]);

  const addTag = (tagName) => {
    setTags([...tags, tagName]);
    setCurrentTag("");
  };

  const deleteTag = (tagName) => {
    let updatedTags = tags.filter((tag) => tag !== tagName);
    setTags(updatedTags);
  };

  const renderTags = () => {
    return tags.map((tag) => (
      <Tag key={tag} aria-label="demo tag">
        {tag}
        <i
          className="fas fa-times"
          aria-label="delete a tag"
          onClick={(e) => deleteTag(tag)}
        ></i>
      </Tag>
    ));
  };

  const renderIcon = () => {
    if (isEditing) {
      return <i className="fas fa-pen"></i>;
    }
    return <i className="fas fa-plus"></i>;
  };

  const handleSubmit = function () {
    const submitObject = { name, githubLink, demoLink, description, tags };
    if (isEditing) {
      onSubmit({ id: item._id, ...submitObject });
    } else {
      onSubmit(submitObject);
    }
    setName("");
    setGithubLink("");
    setDemoLink("");
    setDescription("");
    setTags([]);
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
      <label>
        技術標籤
        <StyledInput
          type="text"
          value={currentTag}
          onChange={(e) => setCurrentTag(e.target.value)}
          onKeyDown={(e) => (e.code === "Enter" ? addTag(currentTag) : "")}
        ></StyledInput>
      </label>
      {renderTags()}
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
