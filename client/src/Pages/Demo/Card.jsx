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

const Card = ({ item, onEdit, onDelete }) => {
  return (
    <CardWrapper
      aria-label="demo card"
      className="demo-card"
      id={`demo-${item._id}`}
    >
      <h4>{item.name}</h4>
      <p>
        <i className="fab fa-github"></i>
        <a href={item.githubLink}>{item.githubLink}</a>
      </p>
      <p>
        <i className="fas fa-link"></i>{" "}
        <a href={item.demoLink}>{item.demoLink}</a>
      </p>
      <div className="content">{item.description}</div>
      <div className="button-set">
        <StyledButton aria-label="edit demo" onClick={(e) => onEdit(item)}>
          <i className="fas fa-pen"></i>
        </StyledButton>
        <StyledButton
          aria-label="delete demo"
          onClick={(e) => onDelete(item._id)}
        >
          <i className="fas fa-times"></i>
        </StyledButton>
      </div>
    </CardWrapper>
  );
};

export default Card;
