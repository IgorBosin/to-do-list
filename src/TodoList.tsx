import React, {ChangeEvent, FC, RefObject, useRef, useState} from 'react';
import TasksList from "./TasksList";
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    filter: FilterValuesType
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
    const [error, setError] = useState<boolean>(false)


    const handlerCreator = (filter: FilterValuesType) => () => props.changeFilterValue(filter)


    const maxLengthUserMessage: number = 15
    const isUserMessageToLong: boolean = title.length > maxLengthUserMessage

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }
    const onKeyDownAddTask = (e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTask()
    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }

    const inputErrorClasses = error || isUserMessageToLong ? 'input-error' : ''
    const userMaxLengthMessage = isUserMessageToLong && <div style={{color: 'hotpink'}}>Task title is to long</div>
    const userErrorMessage = error && <div style={{color: 'hotpink'}}>Title is required</div>
    const isAddBtnDisabled = title.length === 0

    return (
        <div className={"todolist"}>
            <h3>{props.title}</h3>
            <div>
                {/*<input ref={addTaskInput}/>*/}
                {/*<button onClick={addTasks}>+</button>*/}
                <input
                    className={inputErrorClasses}
                    value={title}
                    placeholder='Please, enter title'
                    onChange={changeLocalTitle}
                    onKeyDown={onKeyDownAddTask}/>
                {/*<button onClick={() => props.addTask(title)}>+</button>*/}
                <button disabled={isAddBtnDisabled} onClick={addTask}>+</button>
                {userMaxLengthMessage}
                {userErrorMessage}
            </div>
            <TasksList changeTasksStatus={props.changeTasksStatus} tasks={props.tasks} removeTask={props.removeTask}/>
            <div className={'filter-btn-container'}>
                <button className={props.filter === 'all' ? 'active-filter-btn' : 'filter-btn'}
                        onClick={handlerCreator("all")}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter-btn' : 'filter-btn'}
                        onClick={handlerCreator("active")}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter-btn' : 'filter-btn'}
                        onClick={handlerCreator("completed")}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;