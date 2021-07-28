import useActions from "../../Hooks/useActions";
import styled from "styled-components";

const Button = styled.button`
  color: #fff;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  border: 2px solid transparent;

  &:hover {
    border-color: #fff;
  }
`;

const LogoutButton = () => {
  const { logoutUser } = useActions();
  const handleClick = (event) => {
    logoutUser();
  };
  return <Button onClick={(e) => handleClick(e)}>Logout</Button>;
};

export default LogoutButton;
