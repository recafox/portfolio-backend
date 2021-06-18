const DemoController = require("../../controllers/demo.controller");
const DemoModel = require("../../models/demo.model");
const httpMocks = require("node-mocks-http");
const demoId = "60c8c88466909c4ca8eecdbd";
const demo = require("../mock-data/demo.json");
let req, res, next;

jest.mock("../../models/demo.model");

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("DemoController.createDemo", () => {
  it("should have createDemo function", () => {
    expect(typeof DemoController.createDemo).toBe("function");
  });

  it("should call DemoModel.create", async () => {
    req.body = demo;
    await DemoController.createDemo(req, res, next);
    expect(DemoModel.create).toBeCalledWith(demo);
  });

  it("should return json and http code 201", async () => {
    req.body = demo;
    await DemoController.createDemo(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should handle error", async () => {
    const errorMessage = { message: "Error creating" };
    const rejectedPromise = Promise.reject(errorMessage);
    DemoModel.create.mockReturnValue(rejectedPromise);
    await DemoController.createDemo(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});

describe("DemoController.updateDemo", () => {
  it("should have updateDemo function", () => {
    expect(typeof DemoController.updateDemo).toBe("function");
  });

  it("should call DemoModel.findByIdAndUpdate with router parameter", async () => {
    req.params.id = demoId;
    req.body = demo;
    await DemoController.updateDemo(req, res, next);
    expect(DemoModel.findByIdAndUpdate).toBeCalledWith(demoId, demo, {
      new: true,
      useFindAndModify: false,
    });
  });

  it("should return json body and status code 200", async () => {
    req.body = demo;
    DemoModel.findByIdAndUpdate.mockReturnValue(demo);
    await DemoController.updateDemo(req, res, next);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(demo);
  });

  it("should return status code 404 if nothing found", async () => {
    DemoModel.findByIdAndUpdate.mockReturnValue(null);
    await DemoController.updateDemo(req, res, next);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(404);
  });

  it("should handle error", async () => {
    const errorMessage = { message: "Error updating" };
    const rejectedPromise = Promise.reject(errorMessage);
    DemoModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
    await DemoController.updateDemo(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});

describe("DemoController.getDemo", () => {
  it("should have getDemo function", () => {
    expect(typeof DemoController.getDemo).toBe("function");
  });

  it("should call DemoModel.find({})", async () => {
    await DemoController.getDemo(req, res, next);
    expect(DemoModel.find).toBeCalledWith({});
  });

  it("should return json and status code 200", async () => {
    DemoModel.find.mockReturnValue([demo]);
    await DemoController.getDemo(req, res, next);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual([demo]);
    expect(res.statusCode).toBe(200);
  });

  it("should handle error", async () => {
    const errorMessage = { message: "Error finding!" };
    const rejectedPromise = Promise.reject(errorMessage);
    DemoModel.find.mockReturnValue(rejectedPromise);
    await DemoController.getDemo(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});
