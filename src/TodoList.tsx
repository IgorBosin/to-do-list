import React, {useCallback, memo} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, ButtonProps, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TaskWithRedux} from "./TaskWithRedux";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist = memo((props: PropsType) => {
    console.log('Todolist')
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id])

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    }, [props.id])

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id]);

    let allTodolistTasks = props.tasks;
    let tasksForTodolist = allTodolistTasks;

    if (props.filter === "active") {
        tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
    }


    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasksForTodolist.map(t => {
                    // return <Task key={t.id} task={t} todolistId={props.id}
                    //              removeTask={props.removeTask} changeTaskStatus={props.changeTaskStatus}
                    //              changeTaskTitle={props.changeTaskTitle}/>
                    return <TaskWithRedux key={t.id} taskId={t.id} todolistId={props.id}/>
                })
            }
        </div>
        <div style={{paddingTop: "10px"}}>
            <ButtonMaterialUI title={'All'}
                              variant={props.filter === 'all' ? 'outlined' : 'text'}
                              onClick={onAllClickHandler}
                              color={'inherit'}/>
            <ButtonMaterialUI title={'Active'}
                              variant={props.filter === 'active' ? 'outlined' : 'text'}
                              onClick={onActiveClickHandler}
                              color={'primary'}/>
            <ButtonMaterialUI title={'Completed'}
                              variant={props.filter === 'completed' ? 'outlined' : 'text'}
                              onClick={onCompletedClickHandler}
                              color={'secondary'}/>
        </div>
    </div>
})

export const ButtonMaterialUI = memo((props: ButtonProps) => {
    return (
        <Button variant={props.variant} onClick={props.onClick} color={props.color}>{props.title}</Button>
    )
})
