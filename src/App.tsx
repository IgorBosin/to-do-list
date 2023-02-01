import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import NewComponent, {topCarsType} from "./NewComponent";
import Button from "./Button";

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
    const Button1Foo = (subscriber:string, age:number) => {
        console.log(subscriber, age)
    }

    const Button2Foo = (subscriber:string) => {
        console.log(subscriber)
    }

    const Button3Foo = () => {
        console.log('hi')
    }

    return (
        <div className="App">
            <TodoList tasks={props.tasks} titleTodoList={props.titleTodoList}/>
            <NewComponent topCars={props.topCars}/>
            <Button bottonName='one' callBack={()=>Button1Foo('Igor', 28)}/>
            <Button bottonName='two' callBack={()=>Button2Foo('Maria')}/>
            <Button bottonName='three' callBack={Button3Foo}/>
        </div>
    );
}

export default App;
