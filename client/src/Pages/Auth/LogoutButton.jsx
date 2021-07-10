import useActions from "../../Hooks/useActions";

const LogoutButton = () => {
  const { logoutUser } = useActions();
  const handleClick = (event) => {
    logoutUser();
  };
  return <button onClick={(e) => handleClick(e)}>Logout</button>;
};

export default LogoutButton;
