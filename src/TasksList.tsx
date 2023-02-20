import React, {ChangeEvent, FC} from 'react';
import {TaskType} from "./TodoList";

type TasksListPropsType = {
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeTasksStatus: (taskId: string, newIsDone: boolean) => void
}

const TasksList: FC<TasksListPropsType> = (props): JSX.Element => {
    const tasksItems: JSX.Element[] | JSX.Element =
        props.tasks.length
            ? props.tasks.map((task) => {
                const taskClasses = ['task']
            task.isDone && taskClasses.push('task-done')
                const removeTaskHandler = () => props.removeTask(task.id)
                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTasksStatus(task.id, e.currentTarget.checked )
                return (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.isDone}
                            onChange={changeTaskStatusHandler}
                        />
                        <span className={taskClasses.join(' ')}>{task.title}</span>
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