import InputCard from "./InputCard";
import Card from "./Card";
import useActions from "../../Hooks/useActions";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 50px;

  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .demo-card {
    width: calc(50% - 20px);

    &:nth-of-type(1),
    &:nth-of-type(2) {
      margin-top: 40px;
    }
  }
`;

const Demo = ({ demo }) => {
  const { addDemo } = useActions();

  const renderCards = () => {
    if (demo.length) {
      return demo.map((demoItem) => (
        <Card item={demoItem} key={demoItem.name}></Card>
      ));
    } else {
      return "";
    }
  };

  return (
    <Wrapper>
      <InputCard onSubmit={addDemo}></InputCard>
      <div className="card-container">{renderCards()}</div>
    </Wrapper>
  );
};

export default Demo;
