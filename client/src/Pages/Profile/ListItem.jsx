import { getUploadedImageURL } from "../../Helpers";

const ListItem = ({ item, type }) => {
  return (
    <div aria-label={`${type} item`}>
      <img src={getUploadedImageURL(item.imgPath)}></img>
      <p>{item.name}</p>
      {item.link ? <p>{item.link}</p> : ""}
      <p>{item.description}</p>
    </div>
  );
};

export default ListItem;
