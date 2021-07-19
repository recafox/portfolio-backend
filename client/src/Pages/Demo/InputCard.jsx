const InputCard = (props) => {
  return (
    <div>
      <label>
        demo名稱
        <input type="text"></input>
      </label>
      <label>
        github link
        <input type="text"></input>
      </label>
      <label>
        demo連結
        <input type="text"></input>
      </label>
      <textarea placeholder="demo說明"></textarea>
    </div>
  );
};

export default InputCard;
