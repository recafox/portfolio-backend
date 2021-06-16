const ExpController = require("../../controllers/exp.controller");
const ExpModel = require("../../models/exp.model");
const httpMocks = require("node-mocks-http");
const exp = require("../mock-data/exp.json");
const expId = "60c8c88466909c4ca8eecdbd";
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

describe("ExpController.getExp", () => {
  it("should have getExp function", () => {
    expect(typeof ExpController.getExp).toBe("function");
  });

  it("should call ExpModel.find with empty object", async () => {
    await ExpController.getExp(req, res, next);
    expect(ExpModel.find).toHaveBeenCalledWith({});
  });

  it("should return http code 200 and json body", async () => {
    ExpModel.find.mockReturnValue(exp);
    await ExpController.getExp(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(exp);
  });

  it("should handle error", async () => {
    const errorMessage = { message: "Error finding" };
    const rejectedPromise = Promise.reject(errorMessage);
    ExpModel.find.mockReturnValue(rejectedPromise);
    await ExpController.getExp(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});

describe("ExpController.updateExp", () => {
  it("should habe a updateExp function", () => {
    expect(typeof ExpController.updateExp).toBe("function");
  });

  it("should call ExpModel.findByIdAndUpdate with router parameter", async () => {
    req.params.id = expId;
    req.body = exp;
    await ExpController.updateExp(req, res, next);
    expect(ExpModel.findByIdAndUpdate).toHaveBeenCalledWith(expId, exp, {
      new: true, // send updated back
      useFindAndModify: false, // resolve deprecation warning
    });
  });

  it("should return https code 200 and json data", async () => {
    req.params.id = expId;
    req.body = exp;
    ExpModel.findByIdAndUpdate.mockReturnValue(exp);
    await ExpController.updateExp(req, res, next);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(exp);
  });

  it("should return http code 404 if nothing found", async () => {
    ExpModel.findByIdAndUpdate.mockReturnValue(null);
    await ExpController.updateExp(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should handle error", async () => {
    const errorMessage = { message: "error updating" };
    const rejectedPromise = Promise.reject(errorMessage);
    ExpModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
    await ExpController.updateExp(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});

describe("ExpController.deleteExp", () => {
  it("should have deleteExp function", () => {
    expect(typeof ExpController.deleteExp).toBe("function");
  });

  it("should call ExpModel.findByIdAndDelete", async () => {
    req.params.id = expId;
    await ExpController.deleteExp(req, res, next);
    expect(ExpModel.findByIdAndDelete).toHaveBeenCalledWith(expId);
  });

  it("should return http code 200 and json", async () => {
    req.params.id = expId;
    ExpModel.findByIdAndDelete.mockReturnValue(exp);
    await ExpController.deleteExp(req, res, next);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(exp);
  });

  it("should return http code 404 if nothing found", async () => {
    ExpModel.findByIdAndDelete.mockReturnValue(null);
    await ExpController.deleteExp(req, res, next);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(404);
  });

  it("should handle error", async () => {
    const errorMessage = { message: "error deleting" };
    const rejectedPromise = Promise.reject(errorMessage);
    ExpModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
    await ExpController.deleteExp(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});
