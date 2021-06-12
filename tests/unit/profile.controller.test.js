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

describe("ProfileController.createProfile", () => {
  it("should have an createProfile function", () => {
    expect(typeof ProfileController.createProfile).toBe("function");
  });

  it("should call ProfileModel.create", () => {
    let profile = {
      nickname: "Rita",
      description: "a simple lama",
    };
    req.body = profile;
    ProfileController.createProfile(req, res, next);
    expect(ProfileModel.create).toBeCalledWith(profile);
  });

  it("should return http code 201", async () => {
    await ProfileController.createProfile(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should return json body in response", async () => {
    ProfileModel.create.mockReturnValue(profile);
    await ProfileController.createProfile(req, res, next);
    expect(res._getJSONData()).toStrictEqual(profile);
  });
});
