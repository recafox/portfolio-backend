import styled from "styled-components";

const StyledInput = styled.input`
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.secondaryColor};
  background: transparent;
  color: ${(props) => props.theme.secondaryColor};

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${(props) => props.theme.secondaryColor};
  }
`;

export default StyledInput;
