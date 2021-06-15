const ExpController = require("../../controllers/exp.controller");
const ExpModel = require("../../models/exp.model");
const httpMocks = require("node-mocks-http");
const exp = require("../mock-data/exp.json");

let req, res, next;

jest.mock("../../models/exp.model");

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("ExpController.addExp", () => {
  beforeEach(() => {
    req.body = exp;
  });
  it("should have an addExp function", () => {
    expect(typeof ExpController.addExp).toBe("function");
  });

  it("should call ExpModel.create", async () => {
    await ExpController.addExp(req, res, next);
    expect(ExpModel.create).toBeCalledWith(exp);
  });

  it("should return 201 response code", async () => {
    await ExpController.addExp(req, res, next);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(201);
  });

  it("should return created exp in json format", async () => {
    ExpModel.create.mockReturnValue(exp);
    await ExpController.addExp(req, res, next);
    expect(res._getJSONData()).toStrictEqual(exp);
  });

  it("should handle error", async () => {
    const errorMessage = { message: "error adding" };
    const rejectedPromise = Promise.reject(errorMessage);
    ExpModel.create.mockReturnValue(rejectedPromise);
    await ExpController.addExp(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});
