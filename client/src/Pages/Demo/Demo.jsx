import InputCard from "./InputCard";
import Card from "./Card";

const Demo = ({ demo }) => {
  const renderCards = () => {
    if (demo.length) {
      return demo.map((demoItem) => (
        <Card item={demoItem} key={demoItem.name}></Card>
      ));
    }
  };

  return (
    <div>
      <InputCard></InputCard>
      {renderCards()}
    </div>
  );
};

export default Demo;
