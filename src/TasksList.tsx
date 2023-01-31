import React, {FC} from 'react';

type TasksListPropsType = {
    tasks: Array<{
        id: number;
        title: String;
        isDone: boolean;
    }>
}

const TasksList = (props: TasksListPropsType) => {
    const tasksItems: JSX.Element[] | JSX.Element = props.tasks.length
        ? props.tasks.map((task) => {
            return (
                <li key={task.id}>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                </li>
            )
        })
        : <span>Your taskslist is empty</span>

    return (
        <ul>
            {tasksItems}
        </ul>
    );
};

export default TasksList;