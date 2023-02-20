import React, {ChangeEvent, FC, RefObject, useRef, useState} from 'react';
import TasksList from "./TasksList";
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    changeFilterValue: (filter: FilterValuesType) => void
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
    changeTasksStatus: (taskId: string, newIsDone: boolean) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = (props): JSX.Element => {
    //Uncontrolled form inputs

    // const addTaskInput: RefObject<HTMLInputElement> = useRef(null)

    // const addTasks = ()=>{
    //     if(addTaskInput.current){
    //         props.addTask(addTaskInput.current.value)
    //         addTaskInput.current.value = ''
    //     }
    // }

    // const addTasks = ()=>{
    //     addTaskInput.current && props.addTask(addTaskInput.current.value)
    // }

    //Controlled form inputs
    const [title, setTitle] = useState<string>('')

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
        }
        setTitle('')
    }
    const onKeyDownAddTask = (e: React.KeyboardEvent<HTMLInputElement> ) => e.key=== 'Enter' && addTask()
    const setAllFilterValue = () => props.changeFilterValue("all")
    const setActiveFilterValue = () => props.changeFilterValue("active")
    const setCompletedFilterValue = () => props.changeFilterValue("completed")
    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return (
        <div className={"todolist"}>
            <h3>{props.title}</h3>
            <div>
                {/*<input ref={addTaskInput}/>*/}
                {/*<button onClick={addTasks}>+</button>*/}
                <input
                    value={title}
                    onChange={changeLocalTitle}
                    onKeyDown={onKeyDownAddTask}/>
                {/*<button onClick={() => props.addTask(title)}>+</button>*/}
                <button disabled={title.length === 0} onClick={addTask}>+</button>
                {title.length > 15 && <div style={{color: 'hotpink'}}>Task title is to long</div>}
            </div>
            <TasksList changeTasksStatus={props.changeTasksStatus}  tasks={props.tasks} removeTask={props.removeTask}/>
            <div>
                <button onClick={setAllFilterValue}>All</button>
                <button onClick={setActiveFilterValue}>Active</button>
                <button onClick={setCompletedFilterValue}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;