import React from 'react';
import TasksList from "./TasksList";
import {TasksType} from "./App";

type TodolistType = {
    titleTodoList: string;
    tasks: TasksType[]
}

const TodoList = (props:TodolistType) => {
    return (
        <div>
            <div>
                <h3>{props.titleTodoList}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <div>
                    <TasksList tasks={props.tasks} />
                </div>
            </div>
            <button> All</button>
            <button>Active</button>
            <button>Completed</button>
        </div>
    );
};

export default TodoList;