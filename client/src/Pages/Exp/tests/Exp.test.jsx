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

describe("add exp flow", async () => {
  let expScreen,
    expTitleInput,
    expCompanyInput,
    expStartDateInput,
    expEndDateInput,
    expDescriptionInput,
    submitButton;
  beforeEach(async () => {
    server.use(
      rest.get(urls.expURL, (req, res, ctx) => {
        return res.once(ctx.status(200), ctx.json([]));
      })
    );
    expScreen = renderWithRouterAndProvider(<App></App>, {
      initialRouterEntries: ["/backend"],
      initialState: {
        auth: {
          isLogin: true,
          message: null,
        },
        exp: null,
      },
    });

    expTitleInput = await expScreen.findByRole("textbox", { name: "職位" });
    expCompanyInput = await expScreen.findByRole("textbox", {
      name: "公司",
    });
    expStartDateInput = await expScreen.findByLabelText("開始日期");
    expEndDateInput = await expScreen.findByLabelText("結束日期");
    expDescriptionInput = await expScreen.findByPlaceholderText("工作內容說明");
    submitButton = await expScreen.findByLabelText("submit new exp");
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
      const expCard = getAllByLabelText("exp card");
      expect(expCard.length).toBe(1);
      expect(expCard[0]).toHaveTextContent(createdDemoResponse.title);
    });
  });
});
