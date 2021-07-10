import userEvent from "@testing-library/user-event";
import urls from "../../../Constants/urls";
import { rest } from "msw";
import App from "../../App/App";
import server from "../../../TestUtils/Mocks/server";
import { renderWithRouterProviderAndUser } from "../../../TestUtils/renderWith";
import { waitFor } from "@testing-library/react";

test("error-free login / logout flow", async () => {
  const normalScreen = await renderWithRouterProviderAndUser(<App></App>);

  // show backend page
  const backendHeader = await normalScreen.findByRole("heading", {
    name: /Backend/i,
  });
  expect(backendHeader).toBeInTheDocument();

  // logout flow
  const logoutButton = normalScreen.getByRole("button", { name: /logout/i });
  userEvent.click(logoutButton);

  await waitFor(() => {
    expect(
      normalScreen.getByRole("button", { name: /log in/i })
    ).toBeInTheDocument();
  });
  // const loginHeader = await normalScreen.getByRole("heading", {
  //   name: /login/i,
  // });
  // expect(loginHeader).toBeInTheDocument();
});
