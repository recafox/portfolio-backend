import { rest } from "msw";
import urls from "../../Constants/urls";

import { testSuccessLoginResponse, testSuccessLogoutResponse } from "../Data";

export const handlers = [
  rest.post(urls.loginURL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(testSuccessLoginResponse));
  }),

  rest.post(urls.logoutURL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(testSuccessLogoutResponse));
  }),
];
