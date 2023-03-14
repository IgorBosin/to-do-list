import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import TodoList, {TaskType} from "./TodoList";

export type FilterValuesType = "all" | "active" | "completed";

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [todoListIdXXX: string]: TaskType[]
}

type TodoListStateType = TodoListType[]

function App() {

    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, setTodoLists] = useState<TodoListStateType>([
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Beer", isDone: false},
        ],
    })

    function removeTask(todoListId: string, taskId: string) {
        let filteredTasks = {...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)};
        setTasks(filteredTasks);
    }

    function addTask(todoListId: string, title: string) {
        const newTask = {id: v1(), title: title, isDone: false};
        const tasksForUpdate = tasks[todoListId] // одно свойство
        const updatedTasks = [newTask, ...tasksForUpdate] // добавили 4 элемент в массив
        const copyTasks = {...tasks} // копия тасок
        copyTasks[todoListId] = updatedTasks // в копии тасок, в одном свойстве заменили количество элементов на 4
        setTasks(copyTasks)
        // setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }

    function changeTaskStatus(todoListId: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(el => el.id === taskId ? {...el, isDone: isDone} : el)})
    }

    function changeTodoListFilter(todoListId: string, value: FilterValuesType) {
        setTodoLists(todoLists.map(el => el.id === todoListId ? {...el, filter: value} : el))
    }

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(el => el.id !== todoListId))
        // delete tasks[todoListId]
        const copyTask = {...tasks} // иммутабельно
        delete copyTask[todoListId] // иммутабельно
        setTasks(copyTask)          // иммутабельно
    }

    const getFiltredTasks = (tasks: TaskType[], filter: FilterValuesType): TaskType[] => {
        switch (filter) {
            case "active":
                return tasks.filter(t => !t.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }

    const todoListComponents = todoLists.map(el => {
        const filtredTasks: TaskType[] = getFiltredTasks(tasks[el.id], el.filter)
        return (
            <TodoList
                key={el.id}
                title={el.title}
                tasks={filtredTasks}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={el.filter}
                todoListId={el.id}
                removeTodoList={removeTodoList}
            />
        )
    })

    return (
        <div className="App">
            {todoListComponents}
        </div>
    );
}

export default App;
