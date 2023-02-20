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
    const changeTasksStatus = (taskId: string) => {
        setTasks(tasks.map(el=>el.id === taskId ? {...el, isDone: !el.isDone} : el))
    }

    const [filter, setFilter] = React.useState<FilterValuesType>("all")
    const changeFilterValue = (filter: FilterValuesType) => setFilter(filter)

    const getFilteredTasks =(tasks: Array<TaskType>,filter: FilterValuesType): Array<TaskType> => {
        switch (filter) {
            case "active":
                return tasks.filter(t => !t.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }

    const filteredTasks: Array<TaskType> = getFilteredTasks(tasks,filter)
    console.log(filteredTasks)
    //UI:
    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={filteredTasks}
                changeFilterValue={changeFilterValue}
                removeTask={removeTask}
                addTask={addTask}
                changeTasksStatus={changeTasksStatus}
            />
        </div>
    );
}

export default App;