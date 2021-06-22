import React from "react";
import { mount } from "enzyme";
import { findByTestAttr } from "../../../test/testUtils";
import LoginForm from "./LoginForm";
import { signIn as mockSignIn } from "../../actions";
import { storeFactory } from "../../../test/testUtils";
import moxios from "moxios";
import { Provider } from "react-redux";
/**
 * LoginForm integration test
 * What to test?
 * 1. dispatch action login when user submit form
 * 2. if login fails ...
 *    -- show error message
 *    -- state `isLogin` should be false
 * 3. if login succeeds ...
 *    -- redirect to /backend
 *    -- state `isLogin` should be true
 */

const mockUsername = "ritaaaa";
const mockPassword = "ritaisgood";

jest.mock("../../actions");

const setup = (initial = {}) => {
  const store = storeFactory(initial);
  return mount(
    <Provider store={store}>
      <LoginForm></LoginForm>
    </Provider>
  );
};

describe("signIn dispatcher", () => {
  let wrapper;
  it("should be called when login form is submitted", () => {
    wrapper = setup();
    let loginForm = findByTestAttr(wrapper, "component-login-form");
    let usernameInput = findByTestAttr(wrapper, "username-input");
    let passwordInput = findByTestAttr(wrapper, "password-input");
    let usernameMockEvent = { target: { value: mockUsername } };
    usernameInput.simulate("change", usernameMockEvent);
    let passwordMockEvent = { target: { value: mockPassword } };
    passwordInput.simulate("change", passwordMockEvent);
    loginForm.simulate("submit", { preventDefault() {} });
    expect(mockSignIn).toHaveBeenCalledWith(mockUsername, mockPassword);
  });
});
