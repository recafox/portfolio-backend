import { useState } from "react";
import ImageUploader from "../Common/ImageUploader";

const SocialLinkInput = ({ onSubmit }) => {
  const [linkItem, setLinkItem] = useState({
    imgPath: "",
    name: "",
    description: "",
    link: "",
  });

  const handleSubmit = (item) => {
    onSubmit(item);
    setLinkItem({
      ...linkItem,
      imgPath: "",
      name: "",
      description: "",
      link: "",
    });
  };

  const onImageUploaded = (imgID) => {
    setLinkItem({ ...linkItem, imgPath: imgID });
  };

  return (
    <div>
      <ImageUploader
        testId={"social-link"}
        onUploaded={onImageUploaded}
      ></ImageUploader>
      <input
        placeholder="連結名稱"
        value={linkItem.name}
        onChange={(e) => setLinkItem({ ...linkItem, name: e.target.value })}
      ></input>
      <input
        placeholder="連結位置"
        value={linkItem.link}
        onChange={(e) => setLinkItem({ ...linkItem, link: e.target.value })}
      ></input>
      <input
        placeholder="連結說明"
        value={linkItem.description}
        onChange={(e) =>
          setLinkItem({ ...linkItem, description: e.target.value })
        }
      ></input>
      <button
        aria-label="add social link button"
        onClick={(e) => handleSubmit(linkItem)}
      >
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
};

export default SocialLinkInput;
