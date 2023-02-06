import React from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
// rsc - создать компоненту

function App() {
    //BLL:
    const todoListTitle: string = 'what to learn'
    const tasks: Array<TaskType> = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'ES6 & TS', isDone: true},
        {id: 3, title: 'React & Redux', isDone: false},
    ]
    //UI:
    return (
        <div className="App">
            <TodoList title={todoListTitle} tasks={tasks}/>
        </div>
    );
}

export default App;