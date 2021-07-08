import { useState } from "react";
import { useDispatch } from "react-redux";
import { ADD_SOCIAL_LINK } from "../../../../actions/types";
import styled from "styled-components";
import ImageUploader from "../../../components/ImageUploader";
import Button from "../../../components/Button";

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-end;

  input {
    border: none;
    border-bottom: 2px solid ${(props) => props.theme.primaryColor};
    background: transparent;
    text-align: center;
    height: 32px;
    width: 200px;
    font-size: ${(props) => props.theme.fontSizeStandard};
    margin: 0 40px;

    &:focus {
      outline: none;
    }

    &.is--error {
      border-color: ${(props) => props.theme.errorColor};
    }
  }
`;

const LinkInput = (props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState({ text: "", error: false });
  const [link, setLink] = useState({ text: "", error: false });
  const [description, setDescription] = useState({ text: "", error: false });
  const [imgSrc, setImgSrc] = useState(null);

  const handleSubmit = (e) => {
    if (!name.text) {
      setName({ error: true });
    }

    if (!link.text) {
      setLink({ error: true });
    }

    if (!description.text) {
      setDescription({ error: true });
    }

    if (name.text && link.text && description.text) {
      dispatch({
        type: ADD_SOCIAL_LINK,
        payload: {
          name: name.text,
          link: link.text,
          description: description.text,
          imgPath: imgSrc,
        },
      });
      setName({ text: "", error: false });
      setLink({ text: "", error: false });
      setDescription({ text: "", error: false });
      setImgSrc(null);
    }
  };
  return (
    <InputWrapper>
      <ImageUploader
        onSuccessCallback={(id) => {
          setImgSrc(`/image/${id}`);
        }}
        imageSrc={imgSrc}
      ></ImageUploader>
      <input
        placeholder="名稱"
        className={name.error ? "is--error" : ""}
        onChange={(e) => setName({ text: e.target.value })}
        value={name.text}
      ></input>
      <input
        placeholder="連結"
        className={link.error ? "is--error" : ""}
        onChange={(e) => setLink({ text: e.target.value })}
        value={link.text}
      ></input>
      <input
        placeholder="說明"
        className={description.error ? "is--error" : ""}
        onChange={(e) => setDescription({ text: e.target.value })}
        value={description.text}
      ></input>
      <Button aria-label="add link" onClick={(e) => handleSubmit(e)}>
        <i className="fas fa-plus"></i>
      </Button>
    </InputWrapper>
  );
};

export default LinkInput;
