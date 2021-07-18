import { getUploadedImageURL } from "../../Helpers";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  margin: 10px 0;

  img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
  }

  p {
    width: 30%;
    padding: 10px;
    display: flex;
    align-items: center;
  }
`;

const ListItem = ({ item, type, className, onDelete }) => {
  return (
    <Wrapper aria-label={`${type} item`} className={className}>
      <img src={getUploadedImageURL(item.imgPath)}></img>
      <p>{item.name}</p>
      {item.link ? <p>{item.link}</p> : ""}
      <p>{item.description}</p>
      <button
        aria-label={`delete ${type} ${item.name}`}
        onClick={(e) => onDelete(item, type)}
      >
        <i className="fas fa-times"></i>
      </button>
    </Wrapper>
  );
};

export default ListItem;
