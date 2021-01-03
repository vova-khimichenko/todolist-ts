import React, {useCallback, useEffect} from 'react';
import '../App.css';
import {TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {MenuOpen} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC, setTodolistsAC,
} from "../state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {todolistAPI} from "../api/todolist-api";

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
    const todolists = useSelector<AppRootStateType,
        Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType,
        TaskStateType>(state => state.tasks)
    const dispatch = useDispatch()
    // })
    useEffect(() => {
        todolistAPI.getTodolist()
            .then((res) => {
                // @ts-ignore
                dispatch(setTodolistsAC(res.data))
            })
    }, [])

    const addTodolist = useCallback((title: string) => {
        const action = AddTodolistAC(title)
        dispatch(action)
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(RemoveTodolistAC(todolistId))
    }, [dispatch])

    const changeTodolistTitle = useCallback((title: string, todolistId: string) => {
        const action = ChangeTodolistTitleAC(title, todolistId)
        dispatch(action)
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        const action = ChangeTodolistFilterAC(value, todolistId)
        dispatch(action)
    }, [dispatch])

    const removeTask = useCallback((taskId: string, todolistId: string) => {
        const action = removeTaskAC(taskId, todolistId)
        dispatch(action)
    }, [dispatch])

    const addTask = useCallback((taskName: string, todolistId: string) => {
        const action = addTaskAC(taskName, todolistId)
        dispatch(action)
    }, [dispatch])

    const changeTaskTitle = useCallback((id: string, title: string, todolistId: string) => {
        const action = changeTaskTitleAC(id, title, todolistId)
        dispatch(action)
    }, [dispatch])

    const changeTaskStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        const action = changeTaskStatusAC(id, isDone, todolistId)
        dispatch(action)
    }, [dispatch])

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
                            let tasksForTodolist = tasks[todolist.id]
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
                                        changeTaskStatus={changeTaskStatus}
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
