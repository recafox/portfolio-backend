const InputCard = (props) => {
  return (
    <div>
      <label>
        職位
        <input type="text"></input>
      </label>
      <label>
        公司
        <input type="text"></input>
      </label>
      <div>
        <label>
          開始日期
          <input
            type="date"
            onChange={(e) => console.log(e.target.value)}
          ></input>
        </label>
        <label>
          結束日期
          <input type="date"></input>
        </label>
      </div>
      <textarea placeholder="工作內容說明"></textarea>
    </div>
  );
};

export default InputCard;
