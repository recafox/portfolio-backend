import { useState } from "react";
import InputCard from "./InputCard";
import Card from "./Card";
import useActions from "../../Hooks/useActions";
import styled from "styled-components";

const Wrapper = styled.div`
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
  const { addDemo, editDemo, deleteDemo } = useActions();
  const [editItem, setEditItem] = useState(null);

  const renderCards = () => {
    if (demo.length) {
      return demo.map((demoItem) => {
        return (
          <Card
            item={demoItem}
            key={demoItem._id}
            onEdit={setEditItem}
            onDelete={deleteDemo}
          ></Card>
        );
      });
    } else {
      return "";
    }
  };

  return (
    <Wrapper>
      <InputCard
        onSubmit={editItem ? editDemo : addDemo}
        isEditing={editItem ? true : false}
        item={editItem}
      ></InputCard>
      <div className="card-container">{renderCards()}</div>
    </Wrapper>
  );
};

export default Demo;
