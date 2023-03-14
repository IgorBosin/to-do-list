import React, {ChangeEvent, FC} from 'react';
import {TaskType} from "./TodoList";

type TasksListPropsType = {
    tasks: TaskType[]
    removeTask: (todoListId: string,taskId: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, newIsDone: boolean) => void
    todoListId: string
}

const TasksList: FC<TasksListPropsType> = (props): JSX.Element => {
    const tasksItems: JSX.Element[] | JSX.Element =
        props.tasks.length
            ? props.tasks.map((task) => {
                const taskClasses = task.isDone ? 'task task-done' : 'task'
                const removeTaskHandler = () => props.removeTask(props.todoListId, task.id)
                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.todoListId, task.id, e.currentTarget.checked )
                return (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.isDone}
                            onChange={changeTaskStatusHandler}
                        />
                        <span className={taskClasses}>{task.title}</span>
                        <button onClick={removeTaskHandler}>x</button>
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