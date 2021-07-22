import styled from "styled-components";

const StyledTextarea = styled.textarea`
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.secondaryColor};
  color: ${(props) => props.theme.secondaryColor};
  padding: 5px;

  &:focus {
    outline: none;
  }
`;

export default StyledTextarea;
