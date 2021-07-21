const Card = ({ item }) => {
  return (
    <div aria-label="demo card">
      <p>{item.name}</p>
      <p>{item.githubLink}</p>
    </div>
  );
};

export default Card;
