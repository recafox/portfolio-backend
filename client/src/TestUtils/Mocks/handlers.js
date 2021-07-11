import { rest } from "msw";
import urls from "../../Constants/urls";

import {
  testSuccessLoginResponse,
  testSuccessLogoutResponse,
  testSuccessImageUploadResponse,
  testSuccessDeleteImageResponse,
  profileResponse,
} from "../Data";

export const handlers = [
  rest.post(urls.loginURL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(testSuccessLoginResponse));
  }),

  rest.post(urls.logoutURL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(testSuccessLogoutResponse));
  }),

  rest.post(urls.imageURL, (req, res, ctx) => {
    return res(ctx.status(201), ctx.json(testSuccessImageUploadResponse));
  }),

  rest.delete(`${urls.imageURL}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(testSuccessDeleteImageResponse));
  }),

  rest.get(urls.profileURL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(profileResponse)); // return null if nothing found
  }),
];
