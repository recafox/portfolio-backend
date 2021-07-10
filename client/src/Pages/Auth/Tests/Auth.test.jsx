import userEvent from "@testing-library/user-event";
import urls from "../../../Constants/urls";
import { rest } from "msw";
import App from "../../App/App";
import server from "../../../TestUtils/Mocks/server";
import { renderWithRouterProviderAndUser } from "../../../TestUtils/renderWith";

test("error-free login flow", async () => {
  const normalScreen = await renderWithRouterProviderAndUser(<App></App>);

  // show backend page
  const backendHeader = await normalScreen.findByRole("heading", {
    name: /Backend/i,
  });
  expect(backendHeader).toBeInTheDocument();
});
