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

  rest.post(`${baseUrl}/image`, (req, res, ctx) => {
    return res(
      ctx.json({
        _id: "60e2c982095a6f71345c851c",
      })
    );
  }),

  rest.delete(`${baseUrl}/image/:id`, (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.json({
        message: "deleted",
      })
    );
  }),
];
