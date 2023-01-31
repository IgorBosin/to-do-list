import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App, {TasksType} from './App';

const tasks: Array<TasksType> = [
    {id: 1, title: 'HTML&CSS', isDone: true},
    {id: 2, title: 'ES6 & TS', isDone: true},
    {id: 3, title: 'React & Redux', isDone: false},
]

const titleTodoList: string = 'What to learn'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const topCars = [
    {manufacturer:'BMW', model:'m5cs', color: 'black'},
    {manufacturer:'Mercedes', model:'e63s', color: 'red'},
    {manufacturer:'Audi', model:'rs6', color: 'white'}
]

root.render(
    <React.StrictMode>
        <App tasks={tasks} titleTodoList={titleTodoList} topCars={topCars} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

