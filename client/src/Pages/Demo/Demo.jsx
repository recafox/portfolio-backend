import InputCard from "./InputCard";
import Card from "./Card";
import useActions from "../../Hooks/useActions";

const Demo = ({ demo }) => {
  const { addDemo } = useActions();

  const renderCards = () => {
    console.log("render cards", demo);
    if (demo.length) {
      return demo.map((demoItem) => (
        <Card item={demoItem} key={demoItem.name}></Card>
      ));
    } else {
      return "";
    }
  };

  return (
    <div>
      <InputCard onSubmit={addDemo}></InputCard>
      {renderCards()}
    </div>
  );
};

export default Demo;
