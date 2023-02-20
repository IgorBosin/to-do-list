import React from 'react';
import {FilterPropsType} from "./App";

type TodoListType = {
    tasks: TasksType[]
    deleteTask: (taskID: number) => void
    filterTasks: (title: FilterPropsType) => void
}

type TasksType = {
    id: number
    title: string
    isDone: boolean
}

export const TodoList = (props: TodoListType) => {

    const onClickHandler = (title: FilterPropsType) => {
        props.filterTasks(title)
    }

    return (
        <div>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(el => {

                    const onClickHandler = () => {
                        props.deleteTask(el.id)
                    }

                    return (
                        <li key={el.id}>
                            <button onClick={onClickHandler}>X</button>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button
                    onClick={() => onClickHandler('all')}>All
                </button>
                <button
                    onClick={() => onClickHandler('active')}>Active
                </button>
                <button
                    onClick={() => onClickHandler('completed')}>Completed
                </button>
            </div>
        </div>
    );
};