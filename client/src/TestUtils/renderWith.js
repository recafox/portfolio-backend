// renderWithRouter, renderReduxProvider, renderWithRouterAndProvider, renderWithRouterProviderAndUser (mimic login)
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../State/Reducers";

function storeFactory(initialState = {}) {
  const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
  return store;
}

export function renderWithRouter(ui, initialRouterEntries = ["/"]) {
  render(
    <MemoryRouter initialEntries={initialRouterEntries}>{ui}</MemoryRouter>
  );
  return screen;
}

export function renderWithProvider(ui, initialState = {}) {
  const store = storeFactory(initialState);
  render(<Provider store={store}>{ui}</Provider>);

  return screen;
}

export function renderWithRouterAndProvider(
  ui,
  { initialRouterEntries = ["/"], initialState = {} }
) {
  const store = storeFactory(initialState);
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={initialRouterEntries}>{ui}</MemoryRouter>
    </Provider>
  );

  return screen;
}

export async function renderWithRouterProviderAndUser(
  ui,
  { initialState = {} } = {}
) {
  const store = storeFactory(initialState);

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>{ui}</MemoryRouter>
    </Provider>
  );

  // actual username/password values not relevant to tests
  // since server response is hard-coded

  // submit the form
  const loginButton = screen.getByRole("button", { name: /log in/i });
  userEvent.click(loginButton);

  return screen;
}
