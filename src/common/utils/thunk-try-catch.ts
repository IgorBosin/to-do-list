import { AppDispatch, AppRootStateType } from "app/store";
import { handleServerNetworkError } from "common/utils/handle-server-network-error";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { appActions } from "app/app.reducer";
import { BaseResponseType } from "common/types";

/**
 * Обертка для обработки асинхронных действий Redux Thunk с возможностью перехвата ошибок.
 *
 * @template T - Тип, возвращаемый оборачиваемой логикой.
 * @param {BaseThunkAPI<AppRootStateType, unknown, AppDispatch, null | BaseResponseType>} thunkAPI - Объект API для создания Redux Thunk.
 * @param {() => Promise<T>} logic - Функция с асинхронной логикой для выполнения.
 * @returns {Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>>} - Промис с результатом выполнения логики или ошибкой.
 */

export const thunkTryCatch = async <T>(
  thunkAPI: BaseThunkAPI<AppRootStateType, unknown, AppDispatch, null | BaseResponseType>,
  logic: () => Promise<T>,
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    return await logic();
  } catch (e) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  } finally {
    dispatch(appActions.setAppStatus({ status: "idle" }));
  }
};
