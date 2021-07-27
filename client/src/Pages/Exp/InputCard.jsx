import { useState } from "react";
import styled from "styled-components";
import StyledInput from "../Common/StyledInput";
import StyledTextarea from "../Common/StyledTextarea";
import StyledButton from "../Common/StyledButton";

const CardWrapper = styled.div`
  border: 2px solid ${(props) => props.theme.secondaryColor};
  padding: 15px;
  position: relative;

  label {
    margin-bottom: 20px;
    display: block;

    input {
      margin-left: 20px;
    }
  }

  .date-set {
    display: flex;
    input:first-of-type {
      margin-right: 20px;
    }
  }

  textarea {
    width: 100%;
    height: 150px;
    resize: none;
  }

  button {
    position: absolute;
    top: 15px;
    right: 15px;
  }
`;

const InputCard = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = function () {
    onSubmit({ title, company, startDate, endDate, description });
    setTitle("");
    setCompany("");
    setStartDate("");
    setEndDate("");
    setDescription("");
  };

  return (
    <CardWrapper>
      <label>
        職位
        <StyledInput
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></StyledInput>
      </label>
      <label>
        公司
        <StyledInput
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        ></StyledInput>
      </label>
      <div className="date-set">
        <label>
          開始日期
          <StyledInput
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          ></StyledInput>
        </label>
        <label>
          結束日期
          <StyledInput
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          ></StyledInput>
        </label>
      </div>
      <StyledTextarea
        placeholder="工作內容說明"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></StyledTextarea>
      <StyledButton aria-label="submit new exp" onClick={handleSubmit}>
        <i className="fas fa-plus"></i>
      </StyledButton>
    </CardWrapper>
  );
};

export default InputCard;
