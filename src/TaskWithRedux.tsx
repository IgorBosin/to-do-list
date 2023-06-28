import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {Delete} from "@mui/icons-material";
import {EditableSpan} from "./EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskType} from "./TodoList";


type TaskPropsType = {
    todolistId: string
    taskId: string
}

export const TaskWithRedux = memo((props: TaskPropsType) => {
    console.log('TaskWithRedux')
    const dispatch = useDispatch();
    // const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[props.todolistId].filter(el => el.id === props.taskId)[0])
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[props.todolistId].find(i => i.id === props.taskId) as TaskType)

    const removeTask = () => {
        const action = removeTaskAC(props.taskId, props.todolistId);
        dispatch(action);
    }

    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const action = changeTaskStatusAC(props.taskId, e.currentTarget.checked, props.todolistId);
        dispatch(action);
    }

    const changeTaskTitle = useCallback((newValue: string) => {
        const action = changeTaskTitleAC(props.taskId, newValue, props.todolistId);
        dispatch(action);
    }, [dispatch, props.taskId, props.todolistId])

    return (
        <div className={task.isDone ? "is-done" : ""}>
            <Checkbox
                checked={task.isDone}
                color="primary"
                onChange={changeStatus}
            />
            <EditableSpan value={task.title} onChange={changeTaskTitle}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </div>

    );
});
