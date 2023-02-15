import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";

function App() {

    const tasks = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'ES6 & TS', isDone: true},
        {id: 3, title: 'React & Redux', isDone: false},
    ]

    const tasks2 = [
        {id: 1, title: 'HTML&CSS', isDone: false},
        {id: 2, title: 'Redux', isDone: true},
        {id: 3, title: 'React', isDone: false},
    ]

    return (
        <div className="App">
            <TodoList tasks={tasks}/>
            <TodoList tasks={tasks2}/>
        </div>
    );
}

export default App;
