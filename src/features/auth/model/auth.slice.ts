import { createSlice } from "@reduxjs/toolkit";
import { appActions } from "app/app.slice";
import { authAPI, LoginParamsType } from "features/auth/api/auth.api";
import { clearTasksAndTodolists } from "common/actions";
import { createAppAsyncThunk } from "common/utils";
import { ResultCode } from "common/enums";

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>("auth/login", async (arg, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  const res = await authAPI.login(arg);
  if (res.data.resultCode === ResultCode.Success) {
    return { isLoggedIn: true };
  } else {
    const isShowAppError = !res.data.fieldsErrors.length;
    return rejectWithValue({ data: res.data, showGlobalError: isShowAppError });
  }
});

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>("auth/logout", async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  const res = await authAPI.logout();
  if (res.data.resultCode === ResultCode.Success) {
    dispatch(clearTasksAndTodolists());
    // window.location.href = "/login";
    return { isLoggedIn: false };
  } else {
    return rejectWithValue({ data: res.data, showGlobalError: true });
  }
});

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>("app/initializeApp", async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;

  const res = await authAPI.me();
  dispatch(appActions.setAppInitialized({ isInitialized: true }));

  if (res.data.resultCode === ResultCode.Success) {
    return { isLoggedIn: true };
  } else {
    return rejectWithValue({ data: res.data, showGlobalError: false });
  }
});

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      });
  },
});

export const authSlice = slice.reducer;
export const authThunks = { login, logout, initializeApp };
