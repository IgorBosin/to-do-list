import React, {useReducer} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {
    addTaskAC,
    addTaskForTodo,
    changeTaskStatusAC,
    changeTitleTaskAC,
    removeTaskAC,
    TaskReducer
} from "./reducers/taskReducer";
import {
    addTodoListAC,
    changeTitleTodolistAC,
    changeTodoListFilterAC,
    removeTodoListAC,
    TodoListReducer
} from "./reducers/todoListReducer";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [todoListIdXXX: string]: TaskType[]
}

function App() {

    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, todoListsDispatch] = useReducer(TodoListReducer, [
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, tasksDispatch] = useReducer(TaskReducer, {
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

    const addTodolist = (newTitle: string) => {
        const newTodolistId = v1()
        const newTodolist: TodoListType = {id: newTodolistId, title: newTitle, filter: 'all'}
        todoListsDispatch(addTodoListAC(newTodolist))
        tasksDispatch(addTaskForTodo(newTodolistId))
    }
    const removeTodoList = (todoListId: string) => {
        todoListsDispatch(removeTodoListAC(todoListId))
        // const copyTask = {...tasks} // иммутабельно
        // delete copyTask[todoListId] // иммутабельно
        // setTasks(copyTask)          // иммутабельно
    }

    function changeTodoListFilter(todoListId: string, value: FilterValuesType) {
        todoListsDispatch(changeTodoListFilterAC(todoListId, value))
    }

    const changeTitleTodolist = (todoListId: string, newTitle: string) => {
        todoListsDispatch(changeTitleTodolistAC(todoListId, newTitle))
    }

    function addTask(todoListId: string, title: string) {
        tasksDispatch(addTaskAC(todoListId, title))
    }

    function removeTask(todoListId: string, taskId: string) {
        tasksDispatch(removeTaskAC(todoListId, taskId))
    }

    function changeTaskStatus(todoListId: string, taskId: string, isDone: boolean) {
        tasksDispatch(changeTaskStatusAC(todoListId, taskId, isDone))
    }

    const changeTitleTask = (todoListId: string, taskId: string, newTitle: string) => {
        tasksDispatch(changeTitleTaskAC(todoListId, taskId, newTitle))
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
            <Grid item>
                <Paper sx={{p: '10px'}} elevation={10}>
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
                        changeTitleTask={changeTitleTask}
                        changeTitleTodolist={changeTitleTodolist}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        TodoList
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid sx={{p: '10px 0'}} container>
                    <AddItemForm maxLengthUserMessage={15} addNewItem={addTodolist}/>
                </Grid>
                <Grid spacing={2} container>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
