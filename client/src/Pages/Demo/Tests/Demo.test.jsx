import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/react";
import App from "../../App/App";
import Demo from "../Demo";
import urls from "../../../Constants/urls";
import { renderWithRouterAndProvider } from "../../../TestUtils/renderWith";
import { rest } from "msw";
import { server } from "../../../TestUtils/Mocks/server";

test("render blank demo input card if server returns empty, and no demo card", async () => {
  server.resetHandlers(
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
