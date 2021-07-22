import styled from "styled-components";

const StyledButton = styled.button`
  border: 2px solid ${(props) => props.theme.tertiaryColor};
  background: transparent;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  font-size: 16px;
  color: ${(props) => props.theme.tertiaryColor};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export default StyledButton;
