import ImageUploader from "../Common/ImageUploader";

const SkillInput = () => {
  return (
    <div>
      <ImageUploader testId={"skill"}></ImageUploader>
      <input placeholder="技能名稱"></input>
      <input placeholder="技能說明"></input>
      <button>add</button>
    </div>
  );
};

export default SkillInput;
