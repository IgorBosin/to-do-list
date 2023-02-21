import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

function App() {

    const tasksData = [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'ES6 & TS', isDone: true},
        {id: v1(), title: 'React & Redux', isDone: false},
    ]


    let [title, setTitle] = useState('')
    let [tasks, setTasks] = useState(tasksData)
    let [filter, setFilter] = useState('all')

    const addTask = (title: string) => {
        const newTask = {id: v1(), title: title, isDone: true}
        setTasks([newTask, ...tasks])
    }

    const deleteTask = (taskID: string) => {
        setTasks(tasks.filter(el => el.id !== taskID))
    }

    let filterTask = tasks
    if(filter === 'active') filterTask = tasks.filter(el=>!el.isDone)
    if(filter === 'completed') filterTask = tasks.filter(el=>el.isDone)

    const filtredTask = (filt:string) => {
        setFilter(filt)
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
            />
        </div>
    );
}

export default App;
