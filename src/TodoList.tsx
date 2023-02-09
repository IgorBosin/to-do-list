import React from 'react';
import TasksList from "./TasksList";
import {filterType} from "./App";

type TodolistPropsType = {
    title: String;
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    filtEL: (filt: filterType) => void
}

export type TaskType = {
    id: number;
    title: String;
    isDone: boolean;
}

const TodoList = (props: TodolistPropsType) => {
    return (
        <div>
            <div className={'TodoList'}>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    <TasksList tasks={props.tasks} removeTask={props.removeTask}/>
                </ul>
                <div>
                    <button onClick={()=>props.filtEL('all')}>All</button>
                    <button onClick={()=>props.filtEL('active')}>Active</button>
                    <button onClick={()=>props.filtEL('completed')}>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;