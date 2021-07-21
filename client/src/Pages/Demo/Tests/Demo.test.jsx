import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/react";
import App from "../../App/App";
import Demo from "../Demo";
import Backend from "../../Backend/Backend";
import urls from "../../../Constants/urls";
import {
  renderWithRouterAndProvider,
  renderWithProvider,
} from "../../../TestUtils/renderWith";
import { rest } from "msw";
import { server } from "../../../TestUtils/Mocks/server";
import { profileResponse } from "../../../TestUtils/Data";

test("render blank demo input card if server returns empty, and no demo card", async () => {
  server.resetHandlers(
    rest.get(urls.profileURL, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json([profileResponse]));
    }),
    rest.get(urls.demoURL, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json([]));
    })
  );
  const screen = renderWithRouterAndProvider(<App></App>, {
    initialRouterEntries: ["/backend"],
    initialState: {
      auth: {
        isLogin: true,
        message: null,
      },
    },
  });

  const demoNameInput = await screen.findByRole("textbox", {
    name: "demo名稱",
  });
  const gitLinkInput = await screen.findByRole("textbox", {
    name: "github link",
  });
  const demoLinkInput = await screen.findByRole("textbox", {
    name: "demo連結",
  });
  const demoDescriptionInput = await screen.findByPlaceholderText("demo說明");

  expect(demoNameInput.value).toBe("");
  expect(gitLinkInput.value).toBe("");
  expect(demoLinkInput.value).toBe("");
  expect(demoDescriptionInput.value).toBe("");

  await waitFor(() => {
    const demoCard = screen.queryAllByLabelText("demo card");
    expect(demoCard.length).toBe(0);
  });
});

test("error-free add demo flow", async () => {
  server.resetHandlers(
    rest.get(urls.profileURL, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json([profileResponse]));
    }),
    rest.get(urls.demoURL, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json([]));
    }),
    rest.post(urls.demoURL, (req, res, ctx) => {
      return res(ctx.status(200));
    })
  );
  const demoScreen = renderWithRouterAndProvider(<App></App>, {
    initialRouterEntries: ["/backend"],
    initialState: {
      auth: {
        isLogin: true,
        message: null,
      },
      demo: [],
    },
  });

  const text = "lorem ipsum is the best";
  // inputs
  const demoNameInput = demoScreen.getByRole("textbox", {
    name: "demo名稱",
  });
  const gitLinkInput = demoScreen.getByRole("textbox", {
    name: "github link",
  });
  const demoLinkInput = demoScreen.getByRole("textbox", {
    name: "demo連結",
  });
  const demoDescriptionInput = demoScreen.getByPlaceholderText("demo說明");

  userEvent.clear(demoNameInput);
  userEvent.type(demoNameInput, text);
  userEvent.clear(gitLinkInput);
  userEvent.type(gitLinkInput, text);
  userEvent.clear(demoLinkInput);
  userEvent.type(demoLinkInput, text);
  userEvent.clear(demoDescriptionInput);
  userEvent.type(demoDescriptionInput, text);

  const submitButton = demoScreen.getByLabelText("submit demo");
  userEvent.click(submitButton);

  const demoCard = await demoScreen.findByLabelText("demo card");
  expect(demoCard).toHaveTextContent(text);
});
