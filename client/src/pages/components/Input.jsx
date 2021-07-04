import styled from "styled-components";

const Input = styled.input`
  height: 50px;
  width: 100%;
  background: none;
  border-bottom: 2px solid white;
  border-top: none;
  border-left: none;
  border-right: none;
  color: ${(props) => props.theme.supportColor};
  font-size: 24px;
  &:focus {
    outline: none;
  }
  ::placeholder {
    text-align: center;
    color: ${(props) => props.theme.supportColor};
  }
`;

export default Input;
