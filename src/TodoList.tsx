import React, {ChangeEvent} from 'react';
import {filterType} from "./App";

type TodoListType = {
    tasks: TasksType[]
    addTask: (title: string) => void
    setTitle: (title: string) => void
    title: string
    deleteTask: (taskID: string) => void
    filtredTask: (filter: filterType) => void
    changeChecked: (taskID: string, isDone: boolean) => void
}

type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList = (props: TodoListType) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setTitle(e.currentTarget.value)
    }

    const onClickAddTaskHandler = () => {
        props.addTask(props.title)
        props.setTitle('')
    }

    const onClickChangeFilterHandler = (title: filterType) => () => {
        props.filtredTask(title)
    }

    // const onClickChangeFilterHandler = (filter: string) => props.filtredTask(filter)
    // <button onClick={()=>onClickChangeFilterHandler('all')}>All</button>

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) props.addTask(props.title)
    }

    return (
        <div>
            <div>
                <input onKeyPress={onKeyPressHandler} value={props.title} onChange={onChangeHandler}/>
                <button onClick={onClickAddTaskHandler}>+</button>
            </div>
            <ul>
                {props.tasks.map(el => {

                    const onClickDeleteTaskHandler = () => {
                        props.deleteTask(el.id)
                    }

                    const onClickChangeChekedHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeChecked(el.id, e.currentTarget.checked)
                        // props.changeChecked(el.id, el.isDone)
                    }

                    return (
                        <li key={el.id}>
                            <button onClick={onClickDeleteTaskHandler}>X</button>
                            <input onChange={onClickChangeChekedHandler} type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={onClickChangeFilterHandler('all')}>All</button>
                <button onClick={onClickChangeFilterHandler('completed')}>Completed</button>
                <button onClick={onClickChangeFilterHandler('active')}>Active</button>
            </div>
        </div>
    );
};