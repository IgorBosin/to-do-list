import { AnyAction, createSlice, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  status: "idle" as RequestStatusType,
  error: null as string | null,
  isInitialized: false,
};

export type AppInitialStateType = typeof initialState;
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
    setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        // (action: AnyAction) => {
        //   return action.type.endsWith("/pending");
        // },
        isPending,
        (state) => {
          state.status = "loading";
        },
      )
      .addMatcher(isRejected, (state, action: AnyAction) => {
        // чтоб не показывать глобальную ошибку у addTodolist. Вместо добавления свойства showGlobalError
        // if (action.type === "todo/addTodolist/rejected") return;
        // if(action.type.includes('addTodolist')) return

        const { payload, error } = action;
        if (payload) {
          if (payload.showGlobalError) {
            state.error = payload.data.messages.length ? payload.data.messages[0] : "Some error occurred";
          }
        } else {
          state.error = error.message ? error.message : "Some error occurred";
        }
        state.status = "failed";
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = "succeeded";
      });
  },
});

export const appSlice = slice.reducer;
export const appActions = slice.actions;
