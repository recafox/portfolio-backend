import Nav from "../App/Nav/Nav";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import ImageUploader from "../Common/ImageUploader";

const Backend = () => {
  const auth = useSelector((state) => state.auth);

  if (!auth.isLogin) {
    return <Redirect to="/"></Redirect>;
  }
  return (
    <div>
      <Nav></Nav>
      <h1>Backend</h1>
      <div>
        <ImageUploader></ImageUploader>
      </div>
    </div>
  );
};

export default Backend;
