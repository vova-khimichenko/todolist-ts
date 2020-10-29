import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import AddItemForm from "./AddItemForm";
import {
    AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography
} from "@material-ui/core";
import {MenuOpen} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
} from "./todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: string
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {


    // let todolist1 = v1()
    // let todolist2 = v1()
    // let [todolists, setTodolists] = useState<Array<TodolistType>>([
    //     {id: todolist1, title: 'What to learn', filter: 'all'},
    //     {id: todolist2, title: 'What to buy', filter: 'all'}
    // ])
    // let [tasks, setTasks] = useState<TaskStateType>({
    //     [todolist1]: [
    //         {id: v1(), title: 'HTML&CSS', isDone: true},
    //         {id: v1(), title: 'JS', isDone: true},
    //         {id: v1(), title: 'ReactJS', isDone: false},
    //         {id: v1(), title: 'Rest API', isDone: true},
    //         {id: v1(), title: 'GraphQL', isDone: true}
    //     ],
    //     [todolist2]: [
    //         {id: v1(), title: 'Tea', isDone: true},
    //         {id: v1(), title: 'Chocolate', isDone: true},
    //     ]
    // })

    // let [todolists, dispatch] = useReducer(todolistsReducer, [
    //     {id: todolist1, title: 'What to learn', filter: 'all'},
    //     {id: todolist2, title: 'What to buy', filter: 'all'}
    // ])
    // let [tasks, dispatch] = useReducer(tasksReducer, {
    //     [todolist1]: [
    //         {id: v1(), title: 'HTML&CSS', isDone: true},
    //         {id: v1(), title: 'JS', isDone: true},
    //         {id: v1(), title: 'ReactJS', isDone: false},
    //         {id: v1(), title: 'Rest API', isDone: true},
    //         {id: v1(), title: 'GraphQL', isDone: true}
    //     ],
    //     [todolist2]: [
    //         {id: v1(), title: 'Tea', isDone: true},
    //         {id: v1(), title: 'Chocolate', isDone: true},
    //     ]
    // })

    const todolists = useSelector<AppRootStateType,
        Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType,
        TaskStateType>(state => state.tasks)
    const dispatch = useDispatch()

    function removeTodolist(todolistId: string) {
        dispatch(RemoveTodolistAC(todolistId))
    }

    function addTodolist(title: string) {
        const action = AddTodolistAC(title)
        dispatch(action)
    }

    function changeTodolistTitle(title: string, todolistId: string) {
        const action = ChangeTodolistTitleAC(title, todolistId)
        dispatch(action)
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        const action = ChangeTodolistFilterAC(value, todolistId)
        dispatch(action)
    }

    function removeTask(taskId: string, todolistId: string) {
        const action = removeTaskAC(taskId, todolistId)
        dispatch(action)
    }

    function addTask(taskName: string, todolistId: string) {
        const action = addTaskAC(taskName, todolistId)
        dispatch(action)
    }

    function changeTaskTitle(id: string, title: string, todolistId: string) {
        const action = changeTaskTitleAC(id, title, todolistId)
        dispatch(action)
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(id, isDone, todolistId)
        dispatch(action)
    }

    //map variant
    // function changeStatus(id: string, isDone: boolean) {
    //     let newTasks = tasks.map(task => {
    //         if (task.id === id) {
    //             return {...task, isDone: isDone}
    //         } else return task
    //     })
    //     setTasks(newTasks)
    // }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start"
                        // className={classes.menuButton}
                                color="inherit" aria-label="menu">
                        <MenuOpen/>
                    </IconButton>
                    <Typography variant="h6"
                        // className={classes.title}
                    >
                        Todolists
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '10px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(todolist => {
                            let allTodolistTasks = tasks[todolist.id], tasksForTodolist
                            todolist.filter === 'active'
                                ? tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
                                : todolist.filter === 'completed'
                                ? tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
                                : tasksForTodolist = allTodolistTasks

                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={todolist.id}
                                        id={todolist.id}
                                        title={todolist.title}
                                        filter={todolist.filter}
                                        removeTodolist={removeTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeStatus={changeStatus}
                                        changeTaskTitle={changeTaskTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithRedux
