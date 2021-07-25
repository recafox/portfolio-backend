import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/react";
import App from "../../App/App";
import urls from "../../../Constants/urls";
import { renderWithRouterAndProvider } from "../../../TestUtils/renderWith";
import { rest } from "msw";
import { server } from "../../../TestUtils/Mocks/server";
import {
  demoResponse,
  createdDemoResponse,
  editedDemoResponse,
} from "../../../TestUtils/Data";

test("render blank demo input card if server returns empty, and no demo card", async () => {
  server.use(
    rest.get(urls.demoURL, (req, res, ctx) => {
      return res.once(ctx.status(200), ctx.json([]));
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

describe("add demo flow", () => {
  let demoScreen;
  let demoNameInput;
  let gitLinkInput;
  let demoLinkInput;
  let demoDescriptionInput;
  let submitButton;

  beforeEach(() => {
    demoScreen = renderWithRouterAndProvider(<App></App>, {
      initialRouterEntries: ["/backend"],
      initialState: {
        auth: {
          isLogin: true,
          message: null,
        },
        demo: [],
      },
    });

    server.use(
      rest.get(urls.demoURL, (req, res, ctx) => {
        return res.once(ctx.status(200), ctx.json([]));
      })
    );

    demoNameInput = demoScreen.getByRole("textbox", {
      name: "demo名稱",
    });
    gitLinkInput = demoScreen.getByRole("textbox", {
      name: "github link",
    });
    demoLinkInput = demoScreen.getByRole("textbox", {
      name: "demo連結",
    });
    demoDescriptionInput = demoScreen.getByPlaceholderText("demo說明");
    submitButton = demoScreen.getByLabelText("submit demo");
  });

  test("error-free add demo flow", async () => {
    const { name, githubLink, demoLink, description } = createdDemoResponse;
    userEvent.clear(demoNameInput);
    userEvent.type(demoNameInput, name);
    userEvent.clear(gitLinkInput);
    userEvent.type(gitLinkInput, githubLink);
    userEvent.clear(demoLinkInput);
    userEvent.type(demoLinkInput, demoLink);
    userEvent.clear(demoDescriptionInput);
    userEvent.type(demoDescriptionInput, description);
    userEvent.click(submitButton);

    await waitFor(() => {
      const demoCardAfterAdded = demoScreen.getByLabelText("demo card");
      expect(demoCardAfterAdded).toHaveTextContent(description);
    });
  });

  test("show warning if user submit empty content", async () => {
    // clear all fields
    userEvent.clear(demoNameInput);
    userEvent.clear(gitLinkInput);
    userEvent.clear(demoLinkInput);
    userEvent.clear(demoDescriptionInput);
    // submit
    userEvent.click(submitButton);

    const warning = await demoScreen.findByRole("alert");
    expect(warning).toHaveTextContent("Fill in EVERY field before you submit!");
  });

  test("show error message if error occurs when connecting to server", async () => {
    server.use(
      rest.post(urls.demoURL, (req, res, ctx) => {
        return res.once(ctx.status(500));
      })
    );
    const text = "lorem ipsum is the best";

    userEvent.clear(demoNameInput);
    userEvent.type(demoNameInput, text);
    userEvent.clear(gitLinkInput);
    userEvent.type(gitLinkInput, text);
    userEvent.clear(demoLinkInput);
    userEvent.type(demoLinkInput, text);
    userEvent.clear(demoDescriptionInput);
    userEvent.type(demoDescriptionInput, text);
    userEvent.click(submitButton);

    const warning = await demoScreen.findByRole("alert");
    expect(warning).toHaveTextContent("error connecting to server!");
  });
});

test("edit demo flow", async () => {
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

  // server returns one demo card, edit it
  const editDemoButton = await demoScreen.findByLabelText("edit demo");
  userEvent.click(editDemoButton);
  await waitFor(() => {
    const demoNameInput = demoScreen.getByRole("textbox", {
      name: "demo名稱",
    });
    expect(demoNameInput.value).toBe(demoResponse[0].name);
  });

  const demoNameInput = demoScreen.getByRole("textbox", {
    name: "demo名稱",
  });
  const submitButton = demoScreen.getByLabelText("submit demo");

  // make a change
  userEvent.clear(demoNameInput);
  userEvent.type(demoNameInput, editedDemoResponse.name);

  userEvent.click(submitButton);

  await waitFor(() => {
    const demoCard = demoScreen.getByLabelText("demo card");
    expect(demoCard).toHaveTextContent(editedDemoResponse.name);
  });
});

test("delete demo flow", async () => {
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
  const deleteDemoButton = await demoScreen.findByLabelText("delete demo");
  userEvent.click(deleteDemoButton);

  await waitFor(() => {
    const demoCard = demoScreen.queryAllByLabelText("demo card");
    expect(demoCard.length).toBe(0);
  });
});
