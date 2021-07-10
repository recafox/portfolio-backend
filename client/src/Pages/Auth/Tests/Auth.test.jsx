import userEvent from "@testing-library/user-event";
import urls from "../../../Constants/urls";
import { testFailLoginResponse } from "../../../TestUtils/Data/index";
import { rest } from "msw";
import App from "../../App/App";
import { server } from "../../../TestUtils/Mocks/server";
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
});

test("authentication failed flow", async () => {
  server.resetHandlers(
    rest.post(urls.loginURL, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(testFailLoginResponse));
    })
  );

  const loginScreen = await renderWithRouterProviderAndUser(<App />);
  const loginFailAlert = await loginScreen.findByRole("alert");
  expect(loginFailAlert.textContent).toBe("authentication failed");

  // confirm user remains on login page
  const loginHeader = await loginScreen.findByRole("button", {
    name: /log in/i,
  });
  expect(loginHeader).toBeInTheDocument();
});

test("server error login flow", async () => {
  server.resetHandlers(
    rest.post(urls.loginURL, (req, res, ctx) => {
      return res(
        ctx.status(500),
        ctx.json({ message: "error connecting to server" })
      );
    })
  );

  const loginScreen = await renderWithRouterProviderAndUser(<App></App>);
  const loginFailAlert = await loginScreen.findByRole("alert");
  expect(loginFailAlert.textContent).toBe(
    "There was a problem connecting to the server"
  );

  // confirm user remains on login page
  const loginHeader = await loginScreen.findByRole("button", {
    name: /log in/i,
  });
  expect(loginHeader).toBeInTheDocument();
});
