import styled from "styled-components";

const ListItem = styled.li`
  display: flex;
  align-items: center;
  img {
    height: 60px;
    width: 60px;
    border-radius: 50%;
  }

  p {
    width: 200px;
    margin: 40px;
    text-align: center;
  }
`;

const LinkItem = ({ imgSrc, name, link, description }) => {
  return (
    <li role="listitem" aria-label="listitem">
      <img src={imgSrc}></img>
      <p>{name}</p>
      <p>{link}</p>
      <p>{description}</p>
    </li>
  );
};

export default LinkItem;
