import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { server } from "../../../mocks/server";
import { rest } from "msw";

import App from "../../../App";
// what to test?
// login success:
// type in username, password, submit, server response `succeed: true`, jump to backend

// login fail:
// type in username, password, submit, server response `succeed: false`, show red warning text, stay at login page

test("Login succeeds", async () => {
  render(<App></App>);

  // type in username and password
  const usernameInput = screen.getByPlaceholderText(/username/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const submitButton = screen.getByRole("button", { name: /login/i });

  expect(usernameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();

  userEvent.clear(usernameInput);
  userEvent.clear(passwordInput);

  userEvent.type(usernameInput, "ritaaa");
  userEvent.type(passwordInput, "asimplepassword");
  userEvent.click(submitButton);

  const backendHeader = await screen.findByRole("heading", {
    name: /backend/i,
  });
  expect(backendHeader).toBeInTheDocument();
});

test("Login fails", async () => {
  const baseUrl = "http://localhost";
  // overwraote existing handler to test error case
  server.resetHandlers(
    rest.post(`${baseUrl}/auth/login`, (req, res, ctx) => {
      return res(
        ctx.json({
          succeed: false,
        })
      );
    })
  );

  render(<App></App>);
  const usernameInput = screen.getByPlaceholderText(/username/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const submitButton = screen.getByRole("button", { name: /login/i });
  userEvent.clear(usernameInput);
  userEvent.clear(passwordInput);

  userEvent.type(usernameInput, "ritaaa");
  userEvent.type(passwordInput, "asimplepassword");
  userEvent.click(submitButton);

  // show warning if login fails
  const warningText = await screen.findByText(/authentication failed/i);
  expect(warningText).toBeInTheDocument();

  // warning disappear when user focus on one of the input
  userEvent.click(usernameInput);
  expect(warningText).not.toBeInTheDocument();
});
