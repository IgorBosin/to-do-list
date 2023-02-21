import React, {ChangeEvent} from 'react';

type TodoListType = {
    tasks: TasksType[]
    addTask: (title: string) => void
    setTitle: (title: string) => void
    title: string
    deleteTask: (taskID: string) => void
    filtredTask: (filter: string) => void
}

type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList = (props: TodoListType) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setTitle(e.currentTarget.value)
    }

    const onClickAddTaskHandler = () => {
        props.addTask(props.title)
        props.setTitle('')
    }

    const onClickChangeFilterHandler = (title: string) => () => {
        props.filtredTask(title)
    }

    // const onClickChangeFilterHandler = (filter: string) => props.filtredTask(filter)
    // <button onClick={()=>onClickChangeFilterHandler('all')}>All</button>


    return (
        <div>
            <div>
                <input value={props.title} onChange={onChangeHandler}/>
                <button onClick={onClickAddTaskHandler}>+</button>
            </div>
            <ul>
                {props.tasks.map(el => {

                    const onClickDeleteTaskHandler = () => {
                        props.deleteTask(el.id)
                    }

                    return (
                        <li key={el.id}>
                            <button onClick={onClickDeleteTaskHandler}>X</button>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={onClickChangeFilterHandler('all')}>All</button>
                <button onClick={onClickChangeFilterHandler('completed')}>Completed</button>
                <button onClick={onClickChangeFilterHandler('active')}>Active</button>
            </div>
        </div>
    );
};