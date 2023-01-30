import React from 'react';
import {render} from '@testing-library/react';
import App from './App';
import {TaskType} from "./TodoList";

// BLL:
    const tasks: Array<TaskType> = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'ES6 & TS', isDone: true},
        {id: 3, title: 'React & Redux', isDone: false},
    ]
const todoListTitle: string = 'what to learn'

test('renders learn react link', () => {
    debugger
    const {getByText} = render(<App tasks={tasks} todoListTitle={todoListTitle}/>);
    const linkElement = getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
