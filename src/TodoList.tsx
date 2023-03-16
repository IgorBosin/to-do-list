import React, {ChangeEvent, FC, RefObject, useRef, useState} from 'react';
import TasksList from "./TasksList";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";

type TodoListPropsType = {
    title: string
    filter: FilterValuesType
    tasks: TaskType[]
    removeTask: (todoListId: string, taskId: string) => void
    addTask: (todoListId: string, title: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, newIsDone: boolean) => void
    changeTodoListFilter: (todoListId: string, value: FilterValuesType) => void
    todoListId: string
    removeTodoList: (todoListId: string) => void
    changeTitleTask: (todoListId: string, taskId: string, newTitle: string) => void
    changeTitleTodolist: (todoListId: string, newTitle: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = (props): JSX.Element => {
    const addTask = (newTitle: string) => props.addTask(props.todoListId, newTitle)
    const handlerCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(props.todoListId, filter)
    const removeTodoList = () => props.removeTodoList(props.todoListId)

    const changeTitleTodolistHandler = (newTitle: string) => props.changeTitleTodolist(props.todoListId, newTitle)

    return (
        <div className={"todolist"}>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTitleTodolistHandler}/>
                <button onClick={removeTodoList}>X</button>
            </h3>
            <AddItemForm maxLengthUserMessage={15} addNewItem={addTask}/>
            <TasksList
                changeTitleTask={props.changeTitleTask}
                changeTaskStatus={props.changeTaskStatus}
                tasks={props.tasks}
                todoListId={props.todoListId}
                removeTask={props.removeTask}/>

            <div className={'filter-btn-container'}>
                <button className={props.filter === 'all' ? 'active-filter-btn' : 'filter-btn'}
                        onClick={handlerCreator("all")}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter-btn' : 'filter-btn'}
                        onClick={handlerCreator("active")}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter-btn' : 'filter-btn'}
                        onClick={handlerCreator("completed")}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;