import React, {ChangeEvent,  FC, useEffect, useState} from 'react'
import {todolistsApi, UpdateTaskResponsType} from "../api/todolists-api";

export default {
    title: 'API'
}
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistsApi.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')

    const onClickHandler = () => {
        todolistsApi.createTodolist(title)
            .then((res) => {
                setState(res.data.data.item);
            })
        setTitle('')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return <div>
        <input value={title} placeholder={'todolist name'} onChange={onChangeHandler} type="text"/>
        <button onClick={onClickHandler}>Create todolist</button>
        <br/>
        {JSON.stringify(state)}
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [id, setId] = useState<string>('')
    const [viewId, setViewId] = useState<JSX.Element[]>([])

    useEffect(() => {
        todolistsApi.getTodolists()
            .then((res) => {
                setViewId(res.data.map(el =>
                    <li key={el.id}>
                        Todolists ID: <button onClick={() => {
                        navigator.clipboard.writeText(el.id)
                    }}>{el.id}</button>
                        {el.title}
                    </li>
                ))
            })
    }, [state])

    const onClickHandler = () => {
        todolistsApi.deleteTodolist(id)
            .then((res) => {
                setState(res.data);
            })
        setId('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setId(e.currentTarget.value)
    }

    return <div>
        <input value={id} placeholder={'todolist id'} onChange={onChangeHandler} type="text"/>
        <button onClick={onClickHandler}>Delete todolist</button>
        <div>{viewId}</div>
        {JSON.stringify(state)}
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [id, setId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [viewId, setViewId] = useState<JSX.Element[]>([])

    useEffect(() => {
        todolistsApi.getTodolists()
            .then((res) => {
                setViewId(res.data.map(el =>
                    <li key={el.id}>
                        Todolists ID: <button onClick={() => {
                        navigator.clipboard.writeText(el.id)
                    }}>{el.id}</button>
                        {el.title}
                    </li>
                ))
            })
    }, [state])

    const onClickHandler = () => {
        todolistsApi.updateTodolist(id, title)
            .then((res) => {
                setState(res.data);
            })
        setId('')
        setTitle('')
    }

    const onChangeIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setId(e.currentTarget.value)
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return <div>
        <input value={id} placeholder={'todolist id'} onChange={onChangeIdHandler} type="text"/>
        <input value={title} placeholder={'todolist title'} onChange={onChangeTitleHandler} type="text"/>
        <button onClick={onClickHandler}>Update todolist</button>
        {JSON.stringify(state)}
        <div>Todolists ID:{viewId}</div>
    </div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [viewId, setViewId] = useState<JSX.Element[]>([])
    const [id, setId] = useState<string>('')

    useEffect(() => {
        todolistsApi.getTodolists()
            .then((res) => {
                setViewId(res.data.map(el =>
                    <li key={el.id}>
                        Todolists ID: <button onClick={() => {
                        navigator.clipboard.writeText(el.id)
                    }}>{el.id}</button>
                        {el.title}
                    </li>
                ))
            })
    }, [state])

    const onClickHandler = () => {
        todolistsApi.getTasks(id)
            .then((res) => {
                setState(res.data);
            })
        setId('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setId(e.currentTarget.value)
    }

    return <div>
        <input value={id} placeholder={'todolist id'} onChange={onChangeHandler} type="text"/>
        <button onClick={onClickHandler}>Get tasks</button>
        <div>{JSON.stringify(state)}</div>
        <div>{viewId}</div>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [id, setId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [viewId, setViewId] = useState<JSX.Element[]>([])

    useEffect(() => {
        todolistsApi.getTodolists()
            .then((res) => {
                setViewId(res.data.map(el =>
                    <li key={el.id}>
                        Todolists ID: <button onClick={() => {
                        navigator.clipboard.writeText(el.id)
                    }}>{el.id}</button>
                        {el.title}
                    </li>
                ))
            })
    }, [state])

    const onClickHandler = () => {
        todolistsApi.createTask(id, title)
            .then((res) => {
                setState(res.data);
            })
        setId('')
        setTitle('')
    }

    const onChangeIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setId(e.currentTarget.value)
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return <div>
        <input value={id} placeholder={'todolist id'} onChange={onChangeIdHandler} type="text"/>
        <input value={title} placeholder={'task title'} onChange={onChangeTitleHandler} type="text"/>
        <button onClick={onClickHandler}>Create task</button>
        <div>{JSON.stringify(state)}</div>
        <div>{viewId}</div>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [viewId, setViewId] = useState<JSX.Element[] | string>([])

    useEffect(() => {
        todolistsApi.getTodolists()
            .then((res) => {
                setViewId(res.data.map(el =>
                    <li key={el.id}>
                        Todolists ID: <button onClick={() => {
                        navigator.clipboard.writeText(el.id)
                    }}>{el.id}</button>
                        {el.title}
                    </li>
                ))
            })
    }, [state])

    const onClickHandler = () => {
        todolistsApi.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data);
            })
        setTodolistId('')
        setTaskId('')
    }

    const onChangeIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }

    const checkTasksOnClick = () => {
        todolistsApi.getTasks(todolistId)
            .then((res) => {
                res.data.items.length > 0
                    ? setViewId(res.data.items.map(el =>
                        <li key={el.id}>
                            Todolists ID: <button onClick={() => {
                            navigator.clipboard.writeText(el.todoListId)
                        }}>{el.todoListId}</button>
                            <ul>
                                <li>
                                    Task ID: <button onClick={() => {
                                    navigator.clipboard.writeText(el.id)
                                }}>{el.id}</button> - {el.title}
                                </li>
                            </ul>
                        </li>
                    ))
                    : setViewId('Array tasks is empty!')
            })
        setTodolistId('')
    }

    const showTodolistsIdOnClick = () => {
        todolistsApi.getTodolists()
            .then((res) => {
                setViewId(res.data.map(el =>
                    <li key={el.id}>
                        Todolists ID: <button onClick={() => {
                        navigator.clipboard.writeText(el.id)
                    }}>{el.id}</button>
                        {el.title}
                    </li>
                ))
            })
    }

    return <div>
        <input value={todolistId} placeholder={'todolist id'} onChange={onChangeIdHandler} type="text"/>
        <button onClick={checkTasksOnClick}>check tasks</button>
        <button onClick={showTodolistsIdOnClick}>show todolistsId</button>
        <input value={taskId} placeholder={'task id'} onChange={onChangeTitleHandler} type="text"/>
        <button onClick={onClickHandler}>Delete task</button>
        <div>{JSON.stringify(state)}</div>
        <div>{viewId}</div>
    </div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [viewId, setViewId] = useState<JSX.Element[] | string>([])

    useEffect(() => {
        todolistsApi.getTodolists()
            .then((res) => {
                setViewId(res.data.map(el =>
                    <li key={el.id}>
                        Todolists ID: <button onClick={() => {
                        navigator.clipboard.writeText(el.id)
                    }}>{el.id}</button>
                        {el.title}
                    </li>
                ))
            })
    }, [state])

    const properties:UpdateTaskResponsType = {
        title: title,
        description: 'description',
        completed: true,
        status: 1,
        priority: 1,
        startDate: '',
        deadline: '',
    }

    const onClickHandler = () => {
        todolistsApi.updateTask(todolistId, taskId, properties)
            .then((res) => {
                setState(res.data);
            })
        setTodolistId('')
        setTaskId('')
        setTitle('')
    }

    const onChangeTodolistIdHandler = (title: string) => {
        setTodolistId(title)
    }

    const onChangeTaskIdHandler = (title: string) => {
        setTaskId(title)
    }

    const onChangeTitleHandler = (title: string) => {
        setTitle(title)
    }

    const checkTasksOnClick = () => {
        todolistsApi.getTasks(todolistId)
            .then((res) => {
                res.data.items.length > 0
                    ? setViewId(res.data.items.map(el =>
                        <li key={el.id}>
                            Todolists ID: <button onClick={() => {
                            navigator.clipboard.writeText(el.todoListId)
                        }}>{el.todoListId}</button>
                            <ul>
                                <li>
                                    Task ID: <button onClick={() => {
                                    navigator.clipboard.writeText(el.id)
                                }}>{el.id}</button> - {el.title}
                                </li>
                            </ul>
                        </li>
                    ))
                    : setViewId('Array tasks is empty!')
            })
        setTodolistId('')
    }

    const showTodolistsIdOnClick = () => {
        todolistsApi.getTodolists()
            .then((res) => {
                setViewId(res.data.map(el => <li key={el.id}>Todolists ID: {el.id}-{el.title}</li>))
            })
    }

    return <div>
        <Input value={todolistId} placeholder={'todolist id'} callback={onChangeTodolistIdHandler}/>
        <button onClick={checkTasksOnClick}>check tasks</button>
        <button onClick={showTodolistsIdOnClick}>show todolistsId</button>
        <Input value={taskId} placeholder={'task id'} callback={onChangeTaskIdHandler}/>
        <Input value={title} placeholder={'new title task'} callback={onChangeTitleHandler}/>
        <button onClick={onClickHandler}>Update task</button>
        <div>{JSON.stringify(state)}</div>
        <div>{viewId}</div>
    </div>
}

type InputType = {
    value: string
    placeholder: string
    callback: (value: string) => void
}

const Input: FC<InputType> = (props) => {
    const {value, placeholder, callback} = props

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callback(e.currentTarget.value)
    }

    return (
        <input value={value} placeholder={placeholder} onChange={onChangeHandler} type="text"/>
    )
}