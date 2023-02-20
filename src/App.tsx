import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export type FilterPropsType = 'all' | 'active' | 'completed'

const tasksData = [
    {id: 1, title: 'HTML&CSS', isDone: true},
    {id: 2, title: 'ES6 & TS', isDone: true},
    {id: 3, title: 'React & Redux', isDone: false},
]

function App() {
    let [tasks, setTasks] = useState(tasksData)
    let [filter, setFilter] = useState<FilterPropsType>('all')

    if (filter === 'active') tasks = tasks.filter(el => el.isDone)
    if (filter === 'completed') tasks = tasks.filter(el => !el.isDone)

    const filterTasks = (title: FilterPropsType) => {
        setFilter(title)
    }

    const deleteTask = (taskID: number) => {
        const taskDelete = tasks.filter(el => el.id !== taskID)
        setTasks(taskDelete)
    }

    return (
        <div className="App">
            <TodoList
                filterTasks={filterTasks}
                tasks={tasks}
                deleteTask={deleteTask}/>
        </div>
    );
}

export default App;
