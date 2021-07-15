import { useState, useRef } from "react";
import ImageUploader from "../Common/ImageUploader";

const SkillInput = ({ onSubmit }) => {
  const imgUploaderRef = useRef();
  const [skillItem, setSkillItem] = useState({
    imgPath: "",
    name: "",
    description: "",
  });

  const onImageUploaded = (id, callback) => {
    setSkillItem({ ...skillItem, imgPath: id });
  };

  const handleSubmit = () => {
    onSubmit(skillItem);
    setSkillItem({
      img: "",
      name: "",
      description: "",
    });
    imgUploaderRef.current.reset();
  };

  return (
    <div>
      <ImageUploader
        ref={imgUploaderRef}
        testId={"skill"}
        onUploaded={onImageUploaded}
      ></ImageUploader>
      <input
        placeholder="技能名稱"
        value={skillItem.name}
        onChange={(e) => setSkillItem({ ...skillItem, name: e.target.value })}
      ></input>
      <input
        placeholder="技能說明"
        value={skillItem.description}
        onChange={(e) =>
          setSkillItem({ ...skillItem, description: e.target.value })
        }
      ></input>
      <button aria-label="add skill button" onClick={(e) => handleSubmit()}>
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
};

export default SkillInput;
