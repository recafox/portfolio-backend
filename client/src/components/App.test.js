import { mount } from "enzyme";
import { findByTestAttr } from "../../test/testUtils";
import App from "./App";

const setup = (initial) => {
  return mount(<App></App>);
};

test("renders without error", () => {
  const wrapper = setup();
  const app = findByTestAttr(wrapper, "component-app");
  expect(app).toHaveLength(1);
});
