import styled from "styled-components";
import axios from "axios";
import urls from "../../Constants/urls";
import { useState, useEffect } from "react";
import SocialLinkInput from "./SocialLinkInput";
import SkillInput from "./SkillInput";
import useActions from "../../Hooks/useActions";
import ListItem from "./ListItem";
import StyledInput from "../Common/StyledInput";
import StyledTextarea from "../Common/StyledTextarea";

const Wrapper = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;

  .submit-button {
    flex-grow: 0;
    height: 50px;
    background: ${(props) => props.theme.secondaryColor};
    padding: 0 20px;
    margin: 0 auto;
    border: none;
    color: #fff;
    font-size: 24px;
    border-radius: 4px;
    cursor: pointer;
  }
  .nickname-input {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    input {
      margin-left: 20px;
      width: 250px;
    }
  }
  .description-input {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    margin-bottom: 20px;

    textarea {
      margin-left: 20px;
      height: 150px;
      width: 500px;
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

  const deleteItem = async (item, type) => {
    let newList;
    // if has img, delete img
    if (item.imgPath) {
      // delete img in db
      await axios({
        method: "DELETE",
        url: `${urls.imageURL}/${item.imgPath}`,
      });
    }
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

  return (
    <Wrapper>
      <label className="nickname-input">
        暱稱
        <StyledInput
          role="textbox"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        ></StyledInput>
      </label>
      <label className="description-input">
        介紹
        <StyledTextarea
          role="textbox"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></StyledTextarea>
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
        className="submit-button"
        onClick={(e) => submitEditedProfile(e)}
      >
        submit
      </button>
    </Wrapper>
  );
};

export default Profile;
