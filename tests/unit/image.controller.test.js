const ImageController = require("../../controllers/image.controller");
const ImageModel = require("../../models/image.model");
const httpMocks = require("node-mocks-http");
let req, res, next;

jest.mock("../../models/image.model");

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("ImageController.uploadImage", () => {
  it("should have uploadImage function", () => {
    expect(typeof ImageController.uploadImage).toBe("function");
  });
});

describe("ImageController.getImage", () => {
  it("shoud have getImage function", () => {
    expect(typeof ImageController.uploadImage).toBe("function");
  });
});

describe("ImageController.deleteImage", () => {
  it("should hae deleteImage function", () => {
    expect(typeof ImageController.deleteImage).toBe("function");
  });
});
