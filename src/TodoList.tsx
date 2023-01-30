import React from 'react';
import TasksList from "./TasksList";

type TodolistPropsType = {
    title: String;
    tasks: Array<TaskType>
    // tasks: TaskType[]
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
                <TasksList tasks={props.tasks}/>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;