import { appActions, AppInitialStateType, appSlice } from "app/app.slice";

let startState: AppInitialStateType;

beforeEach(() => {
  startState = {
    error: null,
    status: "idle",
    isInitialized: false,
  };
});

test("correct error message should be set", () => {
  const endState = appSlice(startState, appActions.setAppError({ error: "some error" }));
  expect(endState.error).toBe("some error");
});

test("isInitialized set to true on appActions.setAppInitialized", () => {
  const endState = appSlice(startState, appActions.setAppInitialized({ isInitialized: true }));
  expect(endState.isInitialized).toBe(true);
});
