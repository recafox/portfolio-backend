import { useState } from "react";

const InputCard = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [demoLink, setDemoLink] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = function () {
    onSubmit({ name, githubLink, demoLink, description });
    setName("");
    setGithubLink("");
    setDemoLink("");
    setDescription("");
  };

  return (
    <div>
      <label>
        demo名稱
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
      </label>
      <label>
        github link
        <input
          type="text"
          value={githubLink}
          onChange={(e) => setGithubLink(e.target.value)}
        ></input>
      </label>
      <label>
        demo連結
        <input
          type="text"
          value={demoLink}
          onChange={(e) => setDemoLink(e.target.value)}
        ></input>
      </label>
      <textarea
        placeholder="demo說明"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button aria-label="submit demo" onClick={handleSubmit}>
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
};

export default InputCard;
