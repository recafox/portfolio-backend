import axios from "axios";
import { LOGOUT } from "../../actions/types";
import { useDispatch } from "react-redux";
import { useState, useRef } from "react";
import ImageUploader from "../components/ImageUploader";
const BackendEntry = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const dispatch = useDispatch();
  const logout = async (e) => {
    const response = await axios.get("/auth/logout");
    if (response.data.succeed) {
      dispatch({ type: LOGOUT });
    }
  };

  const onImgSuccessCallback = (id) => {
    setImageSrc(`/image/${id}`);
  };

  const onDeletedCallback = (id) => {
    console.log("image is deleted");
  };

  return (
    <div>
      <button onClick={(e) => logout(e)}>logout</button>
      <h1>Backend</h1>
      <ImageUploader></ImageUploader>
    </div>
  );
};

export default BackendEntry;
