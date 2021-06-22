import React from "react";
import { mount } from "enzyme";
import { findByTestAttr } from "../../../test/testUtils";
import LoginForm from "./LoginForm";

/**
 * login form unit test
 * What to test?
 * 1. should have two inputs: username, password
 * 2. state updates with value of input box upon change
 * 3. press submit button should post to server
 */

const setup = (initial) => {
  return mount(<LoginForm></LoginForm>);
};

test("render withour error", () => {
  const wrapper = setup();
  const loginForm = findByTestAttr(wrapper, "component-login-form");
  expect(loginForm).toHaveLength(1);
});

describe("render", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });
  it("should have username input", () => {
    const usernameInput = findByTestAttr(wrapper, "username-input");
    expect(usernameInput).toHaveLength(1);
  });

  it("should have password input", () => {
    const passwordInput = findByTestAttr(wrapper, "password-input");
    expect(passwordInput).toHaveLength(1);
  });
});

describe("state controlled input field", () => {
  describe("state `usename`", () => {
    let mockSetUsername = jest.fn();
    let wrapper;
    let originalUseState; // mock React.useState for testing

    beforeEach(() => {
      mockSetUsername.mockClear();
      React.useState = jest.fn(() => ["", mockSetUsername]);
      originalUseState = React.useState;
      wrapper = setup();
    });

    afterEach(() => {
      React.useState = originalUseState;
    });
    it("should update with value of username input upon change", () => {
      const inputBox = findByTestAttr(wrapper, "username-input");
      const mockEvent = { target: { value: "hello" } };
      inputBox.simulate("change", mockEvent);

      expect(mockSetUsername).toHaveBeenCalledWith("hello");
    });
  });

  describe("state `password`", () => {
    let mockSetPassword = jest.fn();
    let wrapper;
    let originalUseState; // mock React.useState for testing

    beforeEach(() => {
      mockSetPassword.mockClear();
      React.useState = jest.fn(() => ["", mockSetPassword]);
      originalUseState = React.useState;
      wrapper = setup();
    });

    afterEach(() => {
      React.useState = originalUseState;
    });
    it("should update with value of password input upon change", () => {
      const inputBox = findByTestAttr(wrapper, "password-input");
      const mockEvent = { target: { value: "hello" } };
      inputBox.simulate("change", mockEvent);

      expect(mockSetPassword).toHaveBeenCalledWith("hello");
    });
  });
});
