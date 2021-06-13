const ProfileController = require("../../controllers/profile.controller");
const ProfileModel = require("../../models/profile.model");
const httpMocks = require("node-mocks-http");

const profile = require("../mock-data/profile.json");

let req, res, next;

jest.mock("../../models/profile.model");

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("ProfileController.getProfile", () => {
  it("should have a getProfile function", () => {
    expect(typeof ProfileController.getProfile).toBe("function");
  });

  it("should call ProfileModel.find with empty object", async () => {
    let obj = {};
    await ProfileController.getProfile(req, res, next);
    expect(ProfileModel.find).toBeCalledWith(obj);
  });

  it("should return status code 204 if no existing profile is found", async () => {
    // if nothing found in mongo, exec returns empty array
    // mongoose query chaining: find({}).exec() --> return empty array
    ProfileModel.find = jest.fn().mockImplementationOnce(() => ({
      exec: jest.fn().mockResolvedValueOnce([]),
    }));
    await ProfileController.getProfile(req, res, next);
    expect(res.statusCode).toBe(204);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should return profile json and code 200 if existing profile is found", async () => {
    ProfileModel.find = jest.fn().mockImplementationOnce(() => ({
      exec: jest.fn().mockResolvedValueOnce(profile),
    }));
    await ProfileController.getProfile(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(profile);
  });

  it("should handle error", async () => {
    const errorMessage = { message: "Error getting profile" };
    const rejectedPromise = Promise.reject(errorMessage);
    ProfileModel.find = jest.fn().mockImplementationOnce(() => ({
      exec: jest.fn().mockResolvedValueOnce(rejectedPromise),
    }));
    await ProfileController.getProfile(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});

describe.skip("ProfileController.createProfile", () => {});
