import styled from "styled-components";

const Button = styled.button`
  height: 50px;
  padding: 0 12px;
  background: ${(props) => props.theme.primaryColor};
  color: #fff;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  font-size: 24px;
  cursor: pointer;
`;

export default Button;
