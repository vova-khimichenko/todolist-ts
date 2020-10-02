import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";

export type FilterValuesType = 'all' | 'active' | 'completed'
type TodolistType = {
    id: string
    title: string
    filter: string
}
type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolist1 = v1()
    let todolist2 = v1()
    let [todolists, setTodolists] = useState<Array<TodolistType>>([
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
    let [tasks, setTasks] = useState<TaskStateType>({
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

    function addTodolist(title: string) {
        let newTodolist = {
            id: v1(),
            title: title,
            filter: 'all'
        }
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [newTodolist.id]: []})
    }

    function removeTodolist(todolistId: string) {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    function addTask(taskName: string, todolistId: string) {
        let newTask = {id: v1(), title: taskName, isDone: false}
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [newTask, ...todolistTasks]
        setTasks({...tasks})
    }

    function removeTask(taskId: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(task => task.id !== taskId)
        setTasks({...tasks})
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(task => task.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }
    function changeTitle(id: string, title: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(task => task.id === id)
        if (task) {
            task.title = title
            setTasks({...tasks})
        }
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

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(todolist => todolist.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map(todolist => {
                    let allTodolistTasks = tasks[todolist.id], tasksForTodolist
                    todolist.filter === 'active'
                        ? tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
                        : todolist.filter === 'completed'
                        ? tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
                        : tasksForTodolist = allTodolistTasks

                    return <Todolist
                        key={todolist.id}
                        id={todolist.id}
                        title={todolist.title}
                        tasks={tasksForTodolist}
                        removeTodolist={removeTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        changeTitle={changeTitle}
                        filter={todolist.filter}
                    />
                })
            }
        </div>
    )
}

export default App
