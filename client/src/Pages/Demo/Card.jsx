import styled from "styled-components";
import StyledButton from "../Common/StyledButton";

const CardWrapper = styled.div`
  border: 1px solid black;
  height: 300px;
  margin: 20px 0;
  padding: 15px;
  position: relative;

  .button-set {
    position: absolute;
    top: 15px;
    right: 15px;

    button:first-of-type {
      margin-bottom: 15px;
    }
  }
`;

const Card = ({ item }) => {
  return (
    <CardWrapper aria-label="demo card" className="demo-card">
      <p>{item.name}</p>
      <p>{item.githubLink}</p>
      <p>{item.demoLink}</p>
      <p>{item.description}</p>
      <div className="button-set">
        <StyledButton>
          <i className="fas fa-pen"></i>
        </StyledButton>
        <StyledButton>
          <i className="fas fa-times"></i>
        </StyledButton>
      </div>
    </CardWrapper>
  );
};

export default Card;
