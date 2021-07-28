import userEvent from "@testing-library/user-event";
import { getByLabelText, waitFor } from "@testing-library/react";

import { renderWithRouterAndProvider } from "../../../TestUtils/renderWith";
import { rest } from "msw";
import { server } from "../../../TestUtils/Mocks/server";
import App from "../../App/App";
import urls from "../../../Constants/urls";
import {
  expListResponse,
  createExpResponse,
  createdDemoResponse,
} from "../../../TestUtils/Data";
test("render empty input card and no exp card when server returns nothing", async () => {
  server.use(
    rest.get(urls.expURL, (req, res, ctx) => {
      return res.once(ctx.status(200), ctx.json([]));
    })
  );

  const expScreen = renderWithRouterAndProvider(<App></App>, {
    initialState: {
      auth: {
        isLogin: true,
        message: null,
      },
    },
  });

  const expTitleInput = await expScreen.findByRole("textbox", { name: "職位" });
  const expCompanyInput = await expScreen.findByRole("textbox", {
    name: "公司",
  });
  const expStartTimeInput = await expScreen.findByLabelText("開始日期");
  const expEndTimeInput = await expScreen.findByLabelText("結束日期");
  const expDescriptionInput = await expScreen.findByPlaceholderText(
    "工作內容說明"
  );
  expect(expTitleInput.value).toBe("");
  expect(expCompanyInput.value).toBe("");
  expect(expStartTimeInput.value).toBe("");
  expect(expEndTimeInput.value).toBe("");
  expect(expDescriptionInput.value).toBe("");
});

test("renders correct number of exp card based on server response", async () => {
  // server responds with array of one item
  const expScreen = renderWithRouterAndProvider(<App></App>, {
    initialState: {
      auth: {
        isLogin: true,
        message: null,
      },
    },
  });

  const expCard = await expScreen.findAllByLabelText("exp card");
  expect(expCard.length).toBe(1);
  expect(expCard[0]).toHaveTextContent(expListResponse[0].title);
});

describe("add exp flow", () => {
  let expScreen,
    expTitleInput,
    expCompanyInput,
    expStartDateInput,
    expEndDateInput,
    expDescriptionInput,
    submitButton;
  beforeEach(() => {
    server.use(
      rest.get(urls.expURL, (req, res, ctx) => {
        return res.once(ctx.status(200), ctx.json([]));
      })
    );

    server.use(
      rest.post(urls.expURL, (req, res, ctx) => {
        return res.once(ctx.status(201), ctx.json(createExpResponse));
      })
    );
    expScreen = renderWithRouterAndProvider(<App></App>, {
      initialRouterEntries: ["/backend"],
      initialState: {
        auth: {
          isLogin: true,
          message: null,
        },
        profile: [],
        demo: [],
        exp: [],
      },
    });

    expTitleInput = expScreen.getByRole("textbox", { name: "職位" });
    expCompanyInput = expScreen.getByRole("textbox", {
      name: "公司",
    });
    expStartDateInput = expScreen.getByLabelText("開始日期");
    expEndDateInput = expScreen.getByLabelText("結束日期");
    expDescriptionInput = expScreen.getByPlaceholderText("工作內容說明");
    submitButton = expScreen.getByLabelText("submit new exp");
  });

  afterEach(() => {
    server.resetHandlers();
  });

  test("error-free flow", async () => {
    userEvent.clear(expTitleInput);
    userEvent.type(expTitleInput, createExpResponse.title);
    userEvent.clear(expCompanyInput);
    userEvent.type(expCompanyInput, createExpResponse.company);
    userEvent.clear(expStartDateInput);
    userEvent.type(expStartDateInput, "2020-06-08");
    userEvent.clear(expEndDateInput);
    userEvent.type(expEndDateInput, "2021-07-05");
    userEvent.clear(expDescriptionInput);
    userEvent.type(expDescriptionInput, createExpResponse.description);

    // submit
    userEvent.click(submitButton);

    await waitFor(() => {
      const expCard = expScreen.getByLabelText("exp card");
      expect(expCard).toHaveTextContent(createExpResponse.title);
    });
  });

  test("show error message if user does not complete all fields", async () => {
    userEvent.clear(expTitleInput);
    userEvent.clear(expCompanyInput);
    userEvent.clear(expStartDateInput);
    userEvent.clear(expEndDateInput);
    userEvent.clear(expDescriptionInput);
    userEvent.type(expDescriptionInput, createExpResponse.description);

    userEvent.click(submitButton);

    await waitFor(() => {
      const warning = expScreen.getByRole("alert");
      expect(warning).toHaveTextContent(
        "Fill in EVERY field before you submit!"
      );
    });
  });

  test("show error message if error occurs when connecting to server", async () => {
    server.use(
      rest.post(urls.expURL, (req, res, ctx) => {
        return res.once(ctx.status(500));
      })
    );
    userEvent.clear(expTitleInput);
    userEvent.type(expTitleInput, createExpResponse.title);
    userEvent.clear(expCompanyInput);
    userEvent.type(expCompanyInput, createExpResponse.company);
    userEvent.clear(expStartDateInput);
    userEvent.type(expStartDateInput, "2020-06-08");
    userEvent.clear(expEndDateInput);
    userEvent.type(expEndDateInput, "2021-07-05");
    userEvent.clear(expDescriptionInput);
    userEvent.type(expDescriptionInput, createExpResponse.description);

    userEvent.click(submitButton);

    const warning = await expScreen.findByRole("alert");
    expect(warning).toHaveTextContent("error connecting to server!");
  });
});

describe("delete exp flow", () => {
  let expScreen,
    expTitleInput,
    expCompanyInput,
    expStartDateInput,
    expEndDateInput,
    expDescriptionInput,
    submitButton;
  beforeEach(() => {
    expScreen = renderWithRouterAndProvider(<App></App>, {
      initialRouterEntries: ["/backend"],
      initialState: {
        auth: {
          isLogin: true,
          message: null,
        },
        profile: [],
        demo: [],
        exp: [],
      },
    });

    expTitleInput = expScreen.getByRole("textbox", { name: "職位" });
    expCompanyInput = expScreen.getByRole("textbox", {
      name: "公司",
    });
    expStartDateInput = expScreen.getByLabelText("開始日期");
    expEndDateInput = expScreen.getByLabelText("結束日期");
    expDescriptionInput = expScreen.getByPlaceholderText("工作內容說明");
    submitButton = expScreen.getByLabelText("submit new exp");
  });

  afterEach(() => {
    server.resetHandlers();
  });

  test("error-free flow", async () => {
    const deleteExpButton = await expScreen.findByLabelText("delete exp");
    userEvent.click(deleteExpButton);

    await waitFor(() => {
      const existingExpCard = expScreen.queryAllByLabelText("exp card");
      expect(existingExpCard.length).toBe(0);
    });
  });

  test("error connecting to server flow", async () => {
    server.use(
      rest.delete(`${urls.expURL}/:id`, (req, res, ctx) => {
        return res.once(ctx.status(500));
      })
    );
    const deleteExpButton = await expScreen.findByLabelText("delete exp");
    userEvent.click(deleteExpButton);

    const warning = await expScreen.findByRole("alert");
    expect(warning).toHaveTextContent("error connecting to server!");
  });
});
