import { expect } from "@jest/globals";
import { renderWithRouterAndProvider } from "../../../TestUtils/renderWith";
import App from "../../App/App";

test("should have 3 headers for 3 sections", async () => {
  const backendScreen = renderWithRouterAndProvider(<App></App>, {
    initialRouterEntries: ["/backend"],
    initialState: {
      auth: {
        isLogin: true,
        message: null,
      },
    },
  });
  // header show up after ajax is over
  const profileHeader = await backendScreen.findByRole("heading", {
    name: "個人檔案",
  });
  const demoHeader = await backendScreen.findByRole("heading", {
    name: "作品集",
  });
  const expHeader = await backendScreen.findByRole("heading", {
    name: "工作經歷",
  });
  expect(profileHeader).toBeInTheDocument();
  expect(demoHeader).toBeInTheDocument();
  expect(expHeader).toBeInTheDocument();
});
