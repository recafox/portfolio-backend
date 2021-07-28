import styled from "styled-components";
import StyledButton from "../Common/StyledButton";

const CardWrapper = styled.div`
  border: 2px solid ${(props) => props.theme.secondaryColor};
  background-color: ${(props) => props.theme.secondaryColor};
  color: #fff;
  font-family: "Roboto", "Microsoft JhengHei", sans-serif;
  height: 300px;
  margin: 20px 0;
  padding: 15px;
  position: relative;
  white-space: pre-line;

  .button-set {
    position: absolute;
    top: 15px;
    right: 15px;

    button:first-of-type {
      margin-bottom: 15px;
    }
  }

  .card__info {
    width: 50%;
  }

  .date-set {
    display: flex;
    justify-content: space-between;
  }

  h4,
  p {
    height: calc(75px / 3);
    line-height: 22px;

    i {
      margin-right: 10px;
    }
  }

  h4 {
    font-size: 22px;
    font-weight: 500;
  }
  a {
    color: #fff;
  }

  .content {
    margin-top: 15px;
  }
`;

const Card = ({ exp, onDelete }) => {
  const formatTime = (timeString) => {
    // input: 2020-06-08T00:00:00.000Z
    // output: 2020-06-08
    return timeString.split("T")[0];
  };

  return (
    <CardWrapper aria-label="exp card">
      <div className="card__info">
        <h4>{exp.title}</h4>
        <p>{exp.company}</p>
        <div className="date-set">
          <div>
            <p>開始日期</p>
            {formatTime(exp.startDate)}
          </div>
          <div>
            <p>結束日期</p>
            {formatTime(exp.endDate)}
          </div>
        </div>
      </div>
      <p className="content">{exp.description}</p>
      <div className="button-set">
        <StyledButton aria-label="edit demo" onClick={(e) => onEdit(item)}>
          <i className="fas fa-pen"></i>
        </StyledButton>
        <StyledButton
          aria-label="delete exp"
          onClick={(e) => onDelete(exp._id)}
        >
          <i className="fas fa-times"></i>
        </StyledButton>
      </div>
    </CardWrapper>
  );
};

export default Card;
