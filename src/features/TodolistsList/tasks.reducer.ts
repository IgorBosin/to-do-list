import {
  argDeleteTaskType,
  argUpdateTaskType,
  ResultCode,
  TaskPriorities,
  TaskStatuses,
  TaskType,
  todolistsAPI,
  UpdateTaskModelType,
} from "api/todolists-api";
import { handleServerAppError } from "utils/handleServerAppError";
import { appActions } from "app/app.reducer";
import { todolistsThunk } from "features/TodolistsList/todolists.reducer";
import { createSlice } from "@reduxjs/toolkit";
import { clearTasksAndTodolists } from "common/actions/common.actions";
import { createAppAsyncThunk } from "utils/createAppAsyncThunk";
import { handleServerNetworkError } from "utils";

const initialState: TasksStateType = {};

const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // removeTask: (state, action: PayloadAction<{ taskId: string; todolistId: string }>) => {
    //   const tasks = state[action.payload.todolistId];
    //   const index = tasks.findIndex((t) => t.id === action.payload.taskId);
    //   if (index !== -1) tasks.splice(index, 1);
    // },
    // addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
    //   const tasks = state[action.payload.task.todoListId];
    //   tasks.unshift(action.payload.task);
    // },
    // updateTask: (
    //   state,
    //   action: PayloadAction<{
    //     taskId: string;
    //     model: UpdateDomainTaskModelType;
    //     todolistId: string;
    //   }>
    // ) => {
    //   const tasks = state[action.payload.todolistId];
    //   const index = tasks.findIndex((t) => t.id === action.payload.taskId);
    //   if (index !== -1) {
    //     tasks[index] = { ...tasks[index], ...action.payload.model };
    //   }
    // },
    // setTasks: (state, action: PayloadAction<{ tasks: Array<TaskType>; todolistId: string }>) => {
    //   state[action.payload.todolistId] = action.payload.tasks;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex((t) => t.id === action.payload.taskId);
        if (index !== -1) tasks.splice(index, 1);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex((t) => t.id === action.payload.taskId);
        if (index !== -1) {
          tasks[index] = { ...tasks[index], ...action.payload.domainModel };
        }
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.task.todoListId];
        tasks.unshift(action.payload.task);
      })
      .addCase(todolistsThunk.addTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(todolistsThunk.removeTodolist.fulfilled, (state, action) => {
        delete state[action.payload.id];
      })
      .addCase(todolistsThunk.fetchTodolists.fulfilled, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = [];
        });
      })
      .addCase(clearTasksAndTodolists, () => {
        return {};
      });
  },
});

// thunks
const fetchTasks = createAppAsyncThunk<{ tasks: TaskType[]; todolistId: string }, string>(
  "tasks/fetchTasks",
  async (todolistId, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      const res = await todolistsAPI.getTasks(todolistId);
      // dispatch(tasksActions.setTasks({ tasks: res.data.items, todolistId }));
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return { tasks: res.data.items, todolistId };
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      // заглушка, т.к. конструкция try, catch требует возвращения данных из обеих блоков
      return rejectWithValue(null);
    }
  }
);

const addTask = createAppAsyncThunk<{ task: TaskType }, { title: string; todolistId: string }>(
  "tasks/addTask",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      const res = await todolistsAPI.createTask(arg.todolistId, arg.title);
      if (res.data.resultCode === ResultCode.success) {
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
        return { task: res.data.data.item };
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      // заглушка, т.к. конструкция try, catch требует возвращения данных из обеих блоков
      return rejectWithValue(null);
    }
  }
);

export const updateTask = createAppAsyncThunk<argUpdateTaskType, argUpdateTaskType>(
  "tasks/updateTask",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI;

    try {
      const state = getState();
      const task = state.tasks[arg.todolistId].find((t) => t.id === arg.taskId);
      if (!task) {
        return rejectWithValue(null);
      }
      const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...arg.domainModel,
      };

      dispatch(appActions.setAppStatus({ status: "loading" }));
      const res = await todolistsAPI.updateTask({
        todolistId: arg.todolistId,
        taskId: arg.taskId,
        domainModel: apiModel,
      });
      if (res.data.resultCode === ResultCode.success) {
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
        return arg;
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      // заглушка, т.к. конструкция try, catch требует возвращения данных из обеих блоков
      return rejectWithValue(null);
    }
  }
);

export const removeTask = createAppAsyncThunk<argDeleteTaskType, argDeleteTaskType>(
  "task/removeTask",
  async ({ taskId, todolistId }, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      const res = await todolistsAPI.deleteTask({ taskId, todolistId });
      if (res.data.resultCode === ResultCode.success) {
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
        return { taskId, todolistId };
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null);
    }
  }
);

// types
export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};
export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;
export const tasksThunks = { fetchTasks, addTask, updateTask, removeTask };
