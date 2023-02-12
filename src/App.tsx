import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

// rsc - создать компоненту
// CRUD
// R - filter, sort, search

export type filterValuesType = 'all' | 'active' | 'completed'

function App(): JSX.Element {
    //BLL:
    const todoListTitle: string = 'what to learn'

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'ES6 & TS', isDone: true},
        {id: 3, title: 'React & Redux', isDone: false},
    ])
    const removeTasks = (taskId: number) => {
        const updatedTasks = tasks.filter(t => t.id !== taskId)
        setTasks(updatedTasks)
    }

    const [filter, setFilter] = React.useState<filterValuesType>('all')
    const changeFilterValue = (filt: filterValuesType) => setFilter(filt)


    let filtredTasks: Array<TaskType> = []

    if (filter === 'all') {
        filtredTasks = tasks
    }
    if (filter === 'active') {
        filtredTasks = tasks.filter((t) => !t.isDone)
    }
    if (filter === 'completed') {
        filtredTasks = tasks.filter((t) => t.isDone)
    }
    //UI:
    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={filtredTasks}
                changeFilterValue={changeFilterValue}
                removeTasks={removeTasks}
            />
        </div>
    );
}

export default App;