import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import NewComponent from "./NewComponent";
// rsc - создать компоненту

type propsType = {
    tasks: Array<propsTypeTodoList>
    todoListTitle: String
    cars: propsTypeCars[]
}

type propsTypeTodoList = {
    id: number;
    title: String;
    isDone: boolean;
}

type propsTypeCars = {
    manufacturer: string;
    model: string;
}

function App(props: propsType) {
    //UI:
    return (
        <div className="App">
            <TodoList title={props.todoListTitle} tasks={props.tasks} />
            <NewComponent cars={props.cars}/>

        </div>
    );
}

export default App;



