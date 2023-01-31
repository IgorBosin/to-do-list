import React from 'react';
import {TasksType} from "./App";

type TasksListType = {
    tasks: TasksType[];

}

const TasksList = (props: TasksListType) => {
    const checkLengthArray: JSX.Element | JSX.Element[] = props.tasks.length
        ? props.tasks.map((todoListItem) => {
                return (
                    <li key={todoListItem.id}>
                        <input type="checkbox" checked={todoListItem.isDone}/> <span>{todoListItem.title}</span>
                    </li>
                )
            })
        : <span>'Array is empty'</span>
    return <>{checkLengthArray}</>
};

export default TasksList;