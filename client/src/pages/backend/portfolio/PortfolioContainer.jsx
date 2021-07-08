import { useSelector } from "react-redux";

import NicknameInput from "./NicknameInput";
import DescriptionTextArea from "./DescriptionTextArea";
import LinkGroup from "./linkGroup/LinkGroup";

const PortfolioContainer = (props) => {
  const profile = useSelector((state) => state.profile);

  return (
    <div>
      <NicknameInput></NicknameInput>
      <DescriptionTextArea></DescriptionTextArea>
      <div>
        <p>連結</p>
        <LinkGroup links={profile.socialLinks}></LinkGroup>
      </div>
    </div>
  );
};

export default PortfolioContainer;
