import { AppRootStateType } from 'app/store'

// const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)


export const isLoadingSelector = (state: AppRootStateType) => state.auth.isLoggedIn
export const statusSelector = (state: AppRootStateType) => state.app.status
export const isInitializedSelector = (state: AppRootStateType) => state.app.isInitialized
export const isLoggedInSelector = (state: AppRootStateType) => state.auth.isLoggedIn
export const errorSelector = (state: AppRootStateType) => state.app.error
export const todolistsSelector = (state: AppRootStateType) => state.todolists
export const tasksSelector = (state: AppRootStateType) => state.tasks
