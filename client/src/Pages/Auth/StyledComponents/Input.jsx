import styled from "styled-components";

export const Input = styled.input`
  border: none;
  border-bottom: 2px solid #fff;
  background: transparent;
  color: ${(props) => props.theme.secondaryColor};
  height: 40px;
  width: 400px;
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  letter-spacing: 0.5rem;
  ::placeholder {
    text-align: center;
    color: ${(props) => props.theme.secondaryColor};
  }

  &:focus {
    outline: none;
  }
`;
