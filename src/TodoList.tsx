import React from 'react';
import TasksList from "./TasksList";
import {filterValuesType} from "./App";

type TodolistPropsType = {
    title: String;
    tasks: Array<TaskType>
    changeFilterValue: (filter: filterValuesType) => void
    // tasks: TaskType[]
    removeTasks: (taskId: number) => void
}

export type TaskType = {
    id: number;
    title: String;
    isDone: boolean;
}

const TodoList = (props: TodolistPropsType): JSX.Element => {
    return (
        <div>
            <div className={'TodoList'}>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <TasksList tasks={props.tasks} removeTask={props.removeTasks}/>
                <div>
                    <button onClick={() => props.changeFilterValue('all')}>All</button>
                    <button onClick={() => props.changeFilterValue('active')}>Active</button>
                    <button onClick={() => props.changeFilterValue('completed')}>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;