import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SocialLinkInput from "./SocialLinkInput";
import SkillInput from "./SkillInput";
import useActions from "../../Hooks/useActions";
import ListItem from "./ListItem";
/**
 * 
const profileResponse = {
  _id: "60c6190ab53322bb583b7205",
  description: "rita is here!",
  nickname: "Rita",
  skills: [
    {
      _id: "60c6190b2213a24e78b02141",
      name: "React",
      description: "Intermediate",
      imgPath: "60c6190b2213a24e78b02141", // image id in mongo
    },
  ],
  socialLinks: [
    {
      _id: "60c6190b2213a24e78b02140",
      name: "facebook",
      description: "my facebook page",
      imgPath: "60c6190b2213a24e78b02141", // image id in mongo
      link: "https://facebook.com",
    },
  ],
};
 */

const Profile = ({ profile }) => {
  const [nickname, setNickname] = useState(
    profile.nickname ? profile.nickname : ""
  );
  const [description, setDescription] = useState(
    profile.description ? profile.description : ""
  );
  const [skills, setSkills] = useState(profile.skills ? profile.skills : []);
  const [socialLinks, setSocialLinks] = useState(
    profile.socialLinks ? profile.socialLinks : []
  );

  const renderListItem = (list, type) => {
    return list.map((item) => (
      <ListItem item={item} key={item.name} type={type}></ListItem>
    ));
  };

  const onSocialLinkSubmit = (linkItem) => {
    setSocialLinks([...socialLinks, linkItem]);
  };

  return (
    <div>
      <label>
        暱稱
        <input
          role="textbox"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        ></input>
      </label>
      <label>
        介紹
        <textarea
          role="textbox"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </label>
      <div>
        {renderListItem(socialLinks, "social link")}
        <SocialLinkInput onSubmit={onSocialLinkSubmit}></SocialLinkInput>
      </div>
      <div>
        {renderListItem(skills, "skill")}
        <SkillInput></SkillInput>
      </div>
    </div>
  );
};

export default Profile;
