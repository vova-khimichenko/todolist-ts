import React, {useState} from 'react';
import '../../App.css';
import {TodoList} from "../Todolist";
import {v1} from "uuid";
import {AddItemForm} from "../AddItemForm";
import {
    AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography
} from "@material-ui/core";
import {MenuOpen} from "@material-ui/icons";

export type FilterValues = 'all' | 'active' | 'completed'
export type Todolist = {
    id: string
    title: string
    filter: string
}
export type TaskState = {
    [key: string]: Array<any>
}

function App() {

    let todolist1 = v1()
    let todolist2 = v1()
    let [todolists, setTodolists] = useState<Array<Todolist>>([
        {
            id: todolist1,
            title: 'What to learn',
            filter: 'all'
        },
        {
            id: todolist2,
            title: 'What to buy',
            filter: 'all'
        }
    ])
    let [tasks, setTasks] = useState<TaskState>({
        [todolist1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: true}
        ],
        [todolist2]: [
            {id: v1(), title: 'Tea', isDone: true},
            {id: v1(), title: 'Chocolate', isDone: true},
        ]
    })

    function removeTodolist(todolistId: string) {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    function addTodolist(title: string) {
        let newTodolist = {
            id: v1(),
            title: title,
            filter: 'all'
        }
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [newTodolist.id]: []})
    }

    function changeTodolistTitle(title: string, todolistId: string) {
        let todolist = todolists.find(todolist => todolist.id === todolistId)
        if (todolist) {
            todolist.title = title
            setTodolists([...todolists])
        }
    }

    function changeFilter(value: FilterValues, todolistId: string) {
        let todolist = todolists.find(todolist => todolist.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    function removeTask(taskId: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(task => task.id !== taskId)
        setTasks({...tasks})
    }

    function addTask(taskName: string, todolistId: string) {
        let newTask = {id: v1(), title: taskName, isDone: false}
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [newTask, ...todolistTasks]
        setTasks({...tasks})
    }

    function changeTaskTitle(id: string, title: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(task => task.id === id)
        if (task) {
            task.title = title
            setTasks({...tasks})
        }
    }

    function changeTaskStatus(id: string, isDone: boolean, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(task => task.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    //map variant
    // function changeTaskStatus(id: string, isDone: boolean) {
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
                                    // @ts-ignore
                                    <TodoList
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

export default App
