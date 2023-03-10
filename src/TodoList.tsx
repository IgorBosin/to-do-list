import {FilterValuesType} from './App';
import {ChangeEvent, useState} from "react";
import s from './TodoList.module.css'

type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeChecked: (taskID: string, newIsDone: boolean) => void
}

export function Todolist(props: PropsType) {

    let [error, setError] = useState<string | null>('Title is required')
    let [title, setTitle] = useState("")
    let [buttonName, setButtonName] = useState<FilterValuesType>('all')

    // const addTask = () => {
    //     if (title.trim() === '') {
    //         return setError('Title is required')
    //     }
    //     props.addTask(title.trim());
    //     setTitle("");
    // }

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim());
            setTitle("");
        } else setError(error)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => {
        props.changeFilter("all");
        setButtonName('all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active");
        setButtonName('active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed");
        setButtonName('completed')
    }

    const onChangeCheckerHandler = (taskID: string, checked: boolean) => {
        props.changeChecked(taskID, checked)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? s.error : ""}
            />
            <button onClick={addTask}>+</button>
            {/*<div className={s.errorMessage}>{error}</div>*/}
            {error && <div className={s.errorMessage}>{error}</div>}

        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)
                    // const onChangeCheckerHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    //     props.changeChecked(t.id, e.currentTarget.checked)
                    // }

                    return <li className={t.isDone ? '' : s.isDone} key={t.id}>
                        <input
                            onChange={(e) => onChangeCheckerHandler(t.id,e.currentTarget.checked)}
                            // onChange={onChangeCheckerHandler}
                            type="checkbox"
                            checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={buttonName === 'all' ? s.activeFilter : ''} onClick={onAllClickHandler}>All</button>
            <button className={buttonName === 'active' ? s.activeFilter : ''} onClick={onActiveClickHandler}>Active
            </button>
            <button className={buttonName === 'completed' ? s.activeFilter : ''}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}

