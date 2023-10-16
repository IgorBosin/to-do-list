import { authSlice, authThunks } from "features/auth/model/auth.slice";
import { createFulfilledAction } from "common/utils/create-fullfiled-actions";

let initialState: { isLoggedIn: boolean };

beforeEach(() => {
  initialState = {
    isLoggedIn: false,
  };
});

test("isLoggedIn set to false on authThunks.login", () => {
  const action = createFulfilledAction(authThunks.login, { isLoggedIn: true });

  const endState = authSlice(initialState, action);

  expect(endState.isLoggedIn).toBe(true);
});

test("isLoggedIn set to true on authThunks.logout", () => {
  const action = createFulfilledAction(authThunks.logout, { isLoggedIn: false });

  const endState = authSlice(initialState, action);

  expect(endState.isLoggedIn).toBe(false);
});

test("isLoggedIn set to true on authThunks.initializeApp", () => {
  const action = createFulfilledAction(authThunks.initializeApp, { isLoggedIn: true });

  const endState = authSlice(initialState, action);

  expect(endState.isLoggedIn).toBe(true);
});
