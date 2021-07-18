import styled from "styled-components";
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

const Wrapper = styled.div`
  margin-top: 30px;
  .nickname-input {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    input {
      margin-left: 20px;
      width: 250px;
      border: none;
      border-bottom: 1px solid ${(props) => props.theme.secondaryColor};
      background: transparent;
      color: ${(props) => props.theme.secondaryColor};

      &:focus {
        outline: none;
      }
    }
  }
  .description-input {
    display: flex;
    align-items: flex-start;
    margin-bottom: 20px;

    textarea {
      margin-left: 20px;
      height: 75px;
      width: 500px;
      background-color: transparent;
      border: 1px solid ${(props) => props.theme.secondaryColor};
      color: ${(props) => props.theme.secondaryColor};
      padding: 5px;

      &:focus {
        outline: none;
      }
    }
  }
`;

const Profile = ({ profile }) => {
  const { editProfile } = useActions();
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

  const deleteItem = (item, type) => {
    let newList;
    if (type === "social link") {
      newList = socialLinks.filter((link) => link.name !== item.name);
      setSocialLinks(newList);
    } else if (type === "skill") {
      newList = skills.filter((link) => link.name !== item.name);
      setSkills(newList);
    }
  };

  const renderListItem = (list, type) => {
    return list.map((item) => (
      <ListItem
        onDelete={deleteItem}
        className="list-item"
        item={item}
        key={item.name}
        type={type}
      ></ListItem>
    ));
  };

  const onSocialLinkSubmit = (linkItem) => {
    setSocialLinks([...socialLinks, linkItem]);
  };

  const onSkillSubmit = (skillItem) => {
    setSkills([...skills, skillItem]);
  };

  const submitEditedProfile = (e) => {
    const editedProfile = {
      nickname,
      description,
      skills,
      socialLinks,
    };
    editProfile(editedProfile);
  };

  const renderMessage = () => {
    return <p>{profile.message}</p>;
  };

  return (
    <Wrapper>
      <label className="nickname-input">
        暱稱
        <input
          role="textbox"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        ></input>
      </label>
      <label className="description-input">
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
        <SkillInput onSubmit={onSkillSubmit}></SkillInput>
      </div>
      <button
        aria-label="edit profile button"
        onClick={(e) => submitEditedProfile(e)}
      >
        submit
      </button>
      {renderMessage()}
    </Wrapper>
  );
};

export default Profile;
