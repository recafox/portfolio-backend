import useActions from "../../Hooks/useActions";
import InputCard from "./InputCard";
import Card from "./Card";

const Exp = ({ exp }) => {
  const { addExp } = useActions();

  const renderCards = () => {
    return exp.map((item) => <Card key={item._id} exp={item}></Card>);
  };

  return (
    <div>
      <InputCard onSubmit={addExp}></InputCard>
      {renderCards()}
    </div>
  );
};

export default Exp;
