import { useState } from "react";
import useActions from "../../Hooks/useActions";
import InputCard from "./InputCard";
import Card from "./Card";

const Exp = ({ exp }) => {
  const { addExp, deleteExp, editExp } = useActions();
  const [editItem, setEditItem] = useState(null);

  const handleEdit = (editItem) => {
    editExp(editItem);
    setEditItem(null);
  };

  const renderCards = () => {
    return exp.map((item) => (
      <Card
        key={item._id}
        exp={item}
        onDelete={deleteExp}
        onEdit={setEditItem}
      ></Card>
    ));
  };

  return (
    <div>
      <InputCard
        onSubmit={editItem ? handleEdit : addExp}
        editItem={editItem}
      ></InputCard>
      {renderCards()}
    </div>
  );
};

export default Exp;
