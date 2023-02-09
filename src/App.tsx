import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

// rsc - создать компоненту

export type filterType = 'all' | 'completed' | 'active'

function App() {
    //BLL:
    const todoListTitle: string = 'what to learn'
    const tasksData: Array<TaskType> = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'ES6 & TS', isDone: true},
        {id: 3, title: 'React & Redux', isDone: false},
    ]

    let [tasks, setTasks] = useState<Array<TaskType>>(tasksData)

    let [filter, setFilter] = useState<filterType>('all')


    const removeTask = (taskId: number) => {
        let fTask = tasks.filter((el)=>el.id !== taskId)
        setTasks(fTask)
    }

    const filtEL = (filt:filterType) => setFilter(filt)


    if(filter==='all') tasks = tasks
    if(filter==='completed') tasks = tasks.filter((el)=>el.isDone===true)
    if(filter==='active') tasks = tasks.filter((el)=>el.isDone===false)


    //UI:
    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={tasks}
                removeTask={removeTask}
                filtEL={filtEL}/>
        </div>
    );
}

export default App;



