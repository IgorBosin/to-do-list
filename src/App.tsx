import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import NewComponent, {topCarsType} from "./NewComponent";

export type TasksType = {
    id: number;
    title: string;
    isDone: boolean;
}

type AppType = {
    // tasks: TasksType[]
    tasks: Array<TasksType>
    titleTodoList: string
    topCars: topCarsType[]
}

function App(props: AppType) {
    return (
        <div className="App">
            <TodoList tasks={props.tasks} titleTodoList={props.titleTodoList}/>
            <NewComponent topCars={props.topCars}/>
        </div>
    );
}

export default App;
