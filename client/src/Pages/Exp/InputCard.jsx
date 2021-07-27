import { useState } from "react";

const InputCard = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = function () {
    onSubmit({ title, company, startDate, endDate, description });
    setTitle("");
    setCompany("");
    setStartDate("");
    setEndDate("");
    setDescription("");
  };

  return (
    <div>
      <label>
        職位
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
      </label>
      <label>
        公司
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        ></input>
      </label>
      <div>
        <label>
          開始日期
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          ></input>
        </label>
        <label>
          結束日期
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          ></input>
        </label>
      </div>
      <textarea
        placeholder="工作內容說明"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button aria-label="submit new exp" onClick={handleSubmit}>
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
};

export default InputCard;
