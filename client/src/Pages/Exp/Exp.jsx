import InputCard from "./InputCard";
import Card from "./Card";

const Exp = ({ exp }) => {
  const renderCards = () => {
    return exp.map((item) => <Card key={item._id} exp={item}></Card>);
  };

  return (
    <div>
      <InputCard></InputCard>
      {renderCards()}
    </div>
  );
};

export default Exp;
