const ProfileController = require("../../controllers/profile.controller");
const httpMocks = require("node-mocks-http");

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("ProfileController.addProfile", () => {
  it("should have an addProfile function", () => {
    expect(typeof ProfileController.addProfile).toBe("function");
  });
});
