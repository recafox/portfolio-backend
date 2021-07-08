import styled from "styled-components";
import { useEffect } from "react";
import LinkInput from "./LinkInput";
import LinkItem from "./LinkItem";

const List = styled.ul`
  padding: 0;
`;

const LinkGroup = ({ links }) => {
  const renderList = () => {
    if (links && links.length) {
      return (
        <ul className="item-list">
          {links.map(({ name, description, imgPath, link }) => {
            return (
              <li role="listitem" aria-label="listitem" key={name}>
                <img src={imgPath}></img>
                <p>{name}</p>
                <p>{link}</p>
                <p>{description}</p>
              </li>
            );
          })}
        </ul>
      );
    }
  };

  return (
    <div className="link-group">
      {renderList()}
      <LinkInput></LinkInput>
    </div>
  );
};

export default LinkGroup;
