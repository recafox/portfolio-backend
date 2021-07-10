import styled from "styled-components";

export const Button = styled.button`
  background-color: ${(props) => props.theme.tertiaryColor};
  color: #fff;
  height: 40px;
  border-radius: 4px;
  border: none;
  outline: none;
  font-size: 24px;
  padding: 0 40px;
  margin-top: 20px;
  cursor: pointer;
`;
