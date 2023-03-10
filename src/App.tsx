import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: "What to buy", filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    const removeTodolist = (todolistID:string) => {
        setTodolists(todolists.filter(el=>el.id !== todolistID))
        delete tasks[todolistID]
    }

    // let [filter, setFilter] = useState<FilterValuesType>("all");

    function removeTask(todolistID: string, taskId: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== taskId)})
        // let filteredTasks = tasks.filter(t => t.id !== id);
        // setTasks(filteredTasks);
    }

    function addTask(todolistID: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
        // let newTasks = [task, ...tasks];
        // setTasks(newTasks);
    }

    function changeStatus(todolistID: string, taskId: string, newIsDone: boolean) {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, isDone: newIsDone} : el)
        })
        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }
        //
        // setTasks([...tasks]);
    }


    // let tasksForTodolist = tasks;
    //
    // if (todolists[0].filter === "active") {
    //     tasksForTodolist = tasks.filter(t => t.isDone === false);
    // }
    // if (todolists[0].filter === "completed") {
    //     tasksForTodolist = tasks.filter(t => t.isDone === true);
    // }

    function changeFilter(todolistID: string, valueFilter: FilterValuesType) {
        // setTodolists(todolists.map(el=>el.id===todolistID))
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter: valueFilter} : el))
    }

    return (
        <div className="App">
            {todolists.map(el => {
                let tasksForTodolist = tasks[el.id];

                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
                }
                return (
                    <Todolist
                        key={el.id}
                        taskID={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={el.filter}
                        removeTodolist={removeTodolist}
                    />
                )
            })}
        </div>
    )


    // return (
    // <div className="App">
    //     <Todolist title="What to learn"
    //               tasks={tasksForTodolist}
    //               removeTask={removeTask}
    //               changeFilter={changeFilter}
    //               addTask={addTask}
    //               changeTaskStatus={changeStatus}
    //               filter={filter}
    //     />
    // </div>
    // );
}

export default App;
