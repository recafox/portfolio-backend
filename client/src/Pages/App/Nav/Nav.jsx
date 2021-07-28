import styled from "styled-components";
import LogoutButton from "../../Auth/LogoutButton";

const NavWrapper = styled.div`
  background-color: ${(props) => props.theme.tertiaryColor};
  height: 50px;
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;

const InnerWrapper = styled.div`
  width: 1000px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BackendHeader = styled.h1`
  font-size: 32px;
  font-weight: 500;
  color: #fff;
`;

const Nav = () => {
  return (
    <NavWrapper>
      <InnerWrapper>
        <BackendHeader>Backend</BackendHeader>
        <LogoutButton></LogoutButton>
      </InnerWrapper>
    </NavWrapper>
  );
};

export default Nav;
