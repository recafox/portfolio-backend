import { useEffect } from "react";
import Nav from "../App/Nav/Nav";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import useActions from "../../Hooks/useActions";
import Profile from "../Profile/Profile";
import Demo from "../Demo/Demo";

const Backend = () => {
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);
  const demo = useSelector((state) => state.demo);
  const { getProfile, getDemo } = useActions();

  useEffect(() => {
    getProfile();
    getDemo();
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

  const renderDemo = () => {
    if (demo) {
      return (
        <div>
          <Demo demo={demo}></Demo>
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
      {renderDemo()}
    </div>
  );
};

export default Backend;
