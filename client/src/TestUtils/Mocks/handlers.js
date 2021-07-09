import { rest } from "msw";
import urls from "../../Constants/urls";

import { testSuccessLoginResponse } from "../Data";

const handlers = [
  rest.post(urls.loginURL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(testSuccessLoginResponse));
  }),
];

export default handlers;
