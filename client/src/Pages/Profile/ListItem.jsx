import { getUploadedImageURL } from "../../Helpers";
import styled from "styled-components";
import StyledButton from "../Common/StyledButton";
const Wrapper = styled.div`
  display: flex;
  margin: 10px 0;
  justify-content: space-between;
  img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
  }

  p {
    flex-grow: 2;
    margin: 0 20px;
    padding: 10px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${(props) => props.theme.secondaryColor};
  }

  button {
    align-self: center;
  }
`;

const ListItem = ({ item, type, className, onDelete }) => {
  return (
    <Wrapper aria-label={`${type} item`} className={className} type={type}>
      <img src={getUploadedImageURL(item.imgPath)}></img>
      <p>{item.name}</p>
      {item.link ? <p>{item.link}</p> : ""}
      <p>{item.description}</p>
      <StyledButton
        aria-label={`delete ${type} ${item.name}`}
        onClick={(e) => onDelete(item, type)}
      >
        <i className="fas fa-times"></i>
      </StyledButton>
    </Wrapper>
  );
};

export default ListItem;
