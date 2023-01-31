import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

type TaskType = {
    id: number;
    title: String;
    isDone: boolean;
}
//BLL:
const tasks: Array<TaskType> = [
    {id: 1, title: 'HTML&CSS', isDone: true},
    {id: 2, title: 'ES6 & TS', isDone: true},
    {id: 3, title: 'React & Redux', isDone: false},
]

const todoListTitle: string = 'what to learn'

const topCars = [
    {manufacturer:'BMW', model:'m5cs'},
    {manufacturer:'Mercedes', model:'e63s'},
    {manufacturer:'Audi', model:'rs6'}
]

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <App tasks={tasks} todoListTitle={todoListTitle} cars={topCars}/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

