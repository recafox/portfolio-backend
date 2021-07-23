import { rest } from "msw";
import urls from "../../Constants/urls";

import {
  testSuccessLoginResponse,
  testSuccessLogoutResponse,
  testSuccessImageUploadResponse,
  testSuccessDeleteImageResponse,
  profileResponse,
  demoResponse,
  createdDemoResponse,
  editedDemoResponse
} from "../Data";

export const handlers = [

  // --------- AUTH
  rest.post(urls.loginURL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(testSuccessLoginResponse));
  }),

  rest.post(urls.logoutURL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(testSuccessLogoutResponse));
  }),

  // --------- IMAGE
  rest.post(urls.imageURL, (req, res, ctx) => {
    return res(ctx.status(201), ctx.json(testSuccessImageUploadResponse));
  }),

  rest.delete(`${urls.imageURL}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(testSuccessDeleteImageResponse));
  }),

  // --------- PROFILE
  rest.get(urls.profileURL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([profileResponse])); // return null if nothing found
  }),

  rest.post(urls.profileURL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(profileResponse));
  }),

  // --------- DEMO
  rest.get(urls.demoURL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(demoResponse));
  }),

  rest.post(urls.demoURL, (req, res, ctx) => {
    return res(ctx.status(201), ctx.json(createdDemoResponse));
  }),
  rest.put(`${urls.demoURL}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(editedDemoResponse));
  }),
];
