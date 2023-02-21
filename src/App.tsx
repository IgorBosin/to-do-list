import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type filterType = 'all' | 'completed' | 'active'

function App() {

    const tasksData = [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'ES6 & TS', isDone: true},
        {id: v1(), title: 'React & Redux', isDone: false},
    ]


    let [title, setTitle] = useState('')
    let [tasks, setTasks] = useState(tasksData)
    let [filter, setFilter] = useState<filterType>('all')

    const addTask = (title: string) => {
        const newTask = {id: v1(), title: title, isDone: true}
        setTasks([newTask, ...tasks])
    }
    const deleteTask = (taskID: string) => {
        setTasks(tasks.filter(el => el.id !== taskID))
    }
    const filtredTask = (filt: filterType) => {
        setFilter(filt)
    }

    let filterTask = tasks
    if (filter === 'active') filterTask = tasks.filter(el => !el.isDone)
    if (filter === 'completed') filterTask = tasks.filter(el => el.isDone)

    const changeChecked = (taskID: string, isDone: boolean) => {
        const newTask = tasks.find(el => el.id === taskID)
        if (newTask) newTask.isDone = isDone
        setTasks([...tasks])
    }


    return (
        <div className="App">
            <TodoList
                deleteTask={deleteTask}
                tasks={filterTask}
                setTitle={setTitle}
                title={title}
                addTask={addTask}
                filtredTask={filtredTask}
                changeChecked={changeChecked}
            />
        </div>
    );
}

export default App;