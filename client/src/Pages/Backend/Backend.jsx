import { useEffect } from "react";
import Nav from "../App/Nav/Nav";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import useActions from "../../Hooks/useActions";
import Profile from "../Profile/Profile";

const Backend = () => {
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);
  const { getProfile } = useActions();

  useEffect(() => {
    getProfile();
  }, []);

  if (!auth.isLogin) {
    return <Redirect to="/"></Redirect>;
  }

  const renderProfile = () => {
    if (profile) {
      return (
        <div>
          <Profile profile={profile}></Profile>
        </div>
      );
    } else {
      return <div>Loading</div>;
    }
  };

  return (
    <div>
      <Nav></Nav>
      <h1>Backend</h1>
      {renderProfile()}
    </div>
  );
};

export default Backend;
