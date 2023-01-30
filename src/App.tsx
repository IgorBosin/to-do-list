import React from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
// rsc - создать компоненту

type propsType = {
    tasks: Array<TaskType>
    todoListTitle: String
}

function App(props: propsType) {
    //UI:
    return (
        <div className="App">
            <TodoList title={props.todoListTitle} tasks={props.tasks}/>
        </div>
    );
}

export default App;



