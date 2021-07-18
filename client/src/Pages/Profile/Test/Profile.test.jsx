import { renderWithRouterAndProvider } from "../../../TestUtils/renderWith";
import { profileResponse } from "../../../TestUtils/Data/index";
import { waitFor } from "@testing-library/react";
import App from "../../App/App";
import userEvent from "@testing-library/user-event";
// testing profile
// render nothing if nothing is returned from server
test("render nothing if nothing is returned from server", async () => {
  const screen = renderWithRouterAndProvider(<App></App>, {
    initialRouterEntries: ["/backend"],
    initialState: {
      auth: {
        isLogin: true,
        message: null,
      },
      profile: {},
    },
  });

  // nickname, description should be empty
  const nicknameInput = screen.getByRole("textbox", { name: "暱稱" });
  const descriptionInput = screen.getByRole("textbox", { name: "介紹" });
  expect(nicknameInput.textContent).toBe("");
  expect(descriptionInput.textContent).toBe("");

  // no existing social link item
  const socialLinkItem = screen.queryAllByLabelText("social link");
  expect(socialLinkItem.length).toBe(0);

  // no existing skill item
  const skillItem = screen.queryAllByLabelText("skill");
  expect(skillItem.length).toBe(0);
});

test("render correct content based on server response", () => {
  const screen = renderWithRouterAndProvider(<App></App>, {
    initialRouterEntries: ["/backend"],
    initialState: {
      auth: {
        isLogin: true,
        message: null,
      },
      profile: profileResponse,
    },
  });

  const nicknameInput = screen.getByRole("textbox", { name: "暱稱" });
  const descriptionInput = screen.getByRole("textbox", { name: "介紹" });

  expect(nicknameInput.value).toBe(profileResponse.nickname);
  expect(descriptionInput.textContent).toBe(profileResponse.description);

  const socialLinkItem = screen.queryAllByLabelText("social link item");
  expect(socialLinkItem.length).toBe(profileResponse.socialLinks.length);

  const skillItem = screen.queryAllByLabelText("skill item");
  expect(skillItem.length).toBe(profileResponse.skills.length);
});

test("error-free add profile flow", async () => {
  global.URL.createObjectURL = jest.fn();
  global.URL.createObjectURL.mockReturnValue("mocked-image-src");

  const screen = renderWithRouterAndProvider(<App></App>, {
    initialRouterEntries: ["/backend"],
    initialState: {
      auth: {
        isLogin: true,
        message: null,
      },
      profile: {},
    },
  });

  const nicknameInput = screen.getByRole("textbox", { name: "暱稱" });
  userEvent.clear(nicknameInput);
  userEvent.type(nicknameInput, "Ritaa!");
  const descriptionInput = screen.getByRole("textbox", { name: "介紹" });
  userEvent.clear(descriptionInput);
  userEvent.type(descriptionInput, "I like big cat I can not lie");

  // add a social link
  const imageUploader = screen.getByTestId("social-link-image-uploader");
  const image = new File(["instagram"], "inatagram.png", { type: "image/png" });
  userEvent.upload(imageUploader, image);

  const previewImg = await screen.findByAltText("social-link-preview-img");
  expect(previewImg).toBeInTheDocument();

  const socialLinkNameInput = screen.getByPlaceholderText("連結名稱");
  userEvent.clear(socialLinkNameInput);
  userEvent.type(socialLinkNameInput, "instagram");
  const socialLinkURLInput = screen.getByPlaceholderText("連結位置");
  userEvent.clear(socialLinkURLInput);
  userEvent.type(socialLinkURLInput, "instagram.com");
  const socialLinkDescriptionInput = screen.getByPlaceholderText("連結說明");
  userEvent.clear(socialLinkDescriptionInput);
  userEvent.type(socialLinkDescriptionInput, "a cat bot account");

  const addSocialLinkButton = screen.getByLabelText("add social link button");
  userEvent.click(addSocialLinkButton);

  const socialLinkItem = await screen.getByLabelText("social link item");
  expect(socialLinkItem).toHaveTextContent("a cat bot account");
  expect(socialLinkItem).toHaveTextContent("instagram.com");
  expect(socialLinkItem).toHaveTextContent("instagram");

  // add a skill
  const skillImageUploader = screen.getByTestId("skill-image-uploader");
  const skillImage = new File(["react"], "react.png", { type: "image/png" });
  userEvent.upload(skillImageUploader, skillImage);

  const skillPreviewImg = await screen.findByAltText("skill-preview-img");
  expect(skillPreviewImg).toBeInTheDocument();

  const skillNameInput = screen.getByPlaceholderText("技能名稱");
  userEvent.clear(skillNameInput);
  userEvent.type(skillNameInput, "react");
  const skillDescriptionInput = screen.getByPlaceholderText("技能說明");
  userEvent.clear(skillDescriptionInput);
  userEvent.type(skillDescriptionInput, "ok");
  const addSkillButton = screen.getByLabelText("add skill button");
  userEvent.click(addSkillButton);

  const skillItem = await screen.getByLabelText("skill item");
  expect(skillItem).toHaveTextContent("react");

  const editProfileButton = screen.getByLabelText("edit profile button");
  userEvent.click(editProfileButton);

  await waitFor(() => {
    const successMessage = screen.getByText("success");
    expect(successMessage).toBeInTheDocument();
  });
});

test("delete social link and skill flow", async () => {
  const screen = renderWithRouterAndProvider(<App></App>, {
    initialRouterEntries: ["/backend"],
    initialState: {
      auth: {
        isLogin: true,
        message: null,
      },
      profile: profileResponse,
    },
  });

  // delete a social link
  const deleteSocialLinkButton = screen.getByLabelText(
    "delete social link facebook"
  );
  userEvent.click(deleteSocialLinkButton);
  await waitFor(() => {
    const socialLinkItem = screen.queryAllByLabelText("social link item");
    expect(socialLinkItem.length).toBe(0);
  });

  // delete a skill
  const deleteSkillButton = screen.getByLabelText(/delete skill react/i);
  userEvent.click(deleteSkillButton);
  await waitFor(() => {
    const skillItem = screen.queryAllByLabelText("skill item");
    expect(skillItem.length).toBe(0);
  });
});
