import { renderWithRouterAndProvider } from "../../../TestUtils/renderWith";
import { profileResponse } from "../../../TestUtils/Data/index";
import { rest } from "msw";
import { server } from "../../../TestUtils/Mocks/server";
import urls from "../../../Constants/urls";
import App from "../../App/App";
import Backend from "../../Backend/Backend";
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
});
