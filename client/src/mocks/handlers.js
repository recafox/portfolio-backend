import { rest } from "msw";

const baseUrl = "http://localhost";

export const handlers = [
  rest.post(`${baseUrl}/auth/login`, (req, res, ctx) => {
    return res(
      ctx.json({
        succeed: true,
      })
    );
  }),
];
