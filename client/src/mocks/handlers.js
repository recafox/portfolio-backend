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

  rest.get(`${baseUrl}/profile`, (req, res, ctx) => {
    return res(
      ctx.json({
        description: "rita is here!",
        nickname: "RITA",
        skills: [
          {
            _id: "60c6190b2213a24e78b02141",
            name: "React",
            description: "Intermediate",
            imgPath: "60c6190b2213a24e78b02141",
          },
        ],
        socialLinks: [
          {
            _id: "60c6190b2213a24e78b02140",
            name: "facebook",
            description: "my facebook page",
            imgPath: "60c6190b2213a24e78b02140",
            link: "https://facebook.com",
          },
        ],
      })
    );
  }),
];
