import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"
function App (): JSX.Element {
    //BLL:
    const todoListTitle: string = "What to learn"
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML & CSS", isDone: true},
        {id: v1(), title: "ES6 & TS", isDone: true},
        {id: v1(), title: "React & Redux", isDone: false},
    ])
    const removeTask = (taskId: string) => {
        const updatedTasks = tasks.filter(t => t.id !== taskId)
        setTasks(updatedTasks)
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false,
        }
        // setTasks([newTask, ...tasks])
        const updatedTasks: TaskType[] = [newTask, ...tasks]
        setTasks(updatedTasks)
    }

    const [filter, setFilter] = React.useState<FilterValuesType>("all")
    const changeFilterValue = (filter: FilterValuesType) => setFilter(filter)

    let filteredTasks: Array<TaskType> = []
    if(filter === "all") {
        filteredTasks = tasks
    }
    if(filter === "active") {
        filteredTasks = tasks.filter(t => !t.isDone)
    }
    if(filter === "completed") {
        filteredTasks = tasks.filter(t => t.isDone)
    }
    //UI:
    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={filteredTasks}
                changeFilterValue={changeFilterValue}
                removeTask={removeTask}
                addTask={addTask}
            />
        </div>
    );
}

export default App;