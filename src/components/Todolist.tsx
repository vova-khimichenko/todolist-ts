import React, {useCallback, useEffect} from "react";
import {FilterValues} from "./app/App";
import {AddItemForm} from "./AddItemForm";
import {EditedSpan} from "./EditedSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";
import {fetchTasksTC} from "../state/tasks-reducer";
import {useDispatch} from "react-redux";

export type Task = {
    id: string
    title: string
    isDone: undefined | boolean
}

export type Props = {
    id: string
    title: string
    removeTodolist: (id: string) => void
    changeTodolistTitle: (title: string, id: string) => void
    tasks: Array<Task>
    addTask: (title: string, id: string) => void
    removeTask: (taskId: string, id: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, id: string) => void
    changeTaskTitle: (taskId: string, title: string, id: string) => void
    filter: string
    changeFilter: (value: FilterValues, id: string) => void
}

export const Todolist = React.memo(function (props: Props) {
        // console.log("Todolist called")
        const dispatch = useDispatch()

        useEffect(() => {
                dispatch(fetchTasksTC(props.id))
        }, [])

        const onAddTask = useCallback((title: string) => {
            props.addTask(title, props.id)
        }, [props.addTask, props.id])
        const onRemoveTodolist = () => props.removeTodolist(props.id)
        const onChangeTodolistTitle = useCallback((title: string) => {
            props.changeTodolistTitle(title, props.id)
        }, [props.changeTodolistTitle, props.id])

        const onActiveClickHandler = useCallback(() => {
            props.changeFilter('active', props.id)
        }, [props.changeFilter, props.id])
        const onAllClickHandler = useCallback(() => {
            props.changeFilter('all', props.id)
        }, [props.changeFilter, props.id])
        const onCompletedClickHandler = useCallback(() => {
            props.changeFilter('completed', props.id)
        }, [props.changeFilter, props.id])

        let tasksForTodolist: Array<Task>
        props.filter === 'active'
            ? tasksForTodolist = props.tasks.filter(task => !task.isDone)
            : props.filter === 'completed'
            ? tasksForTodolist = props.tasks.filter(task => task.isDone)
            : tasksForTodolist = props.tasks
        return (
            <div>
                <div>
                    <h3>
                        <EditedSpan value={props.title}
                                    changeTitle={onChangeTodolistTitle}
                        />
                        <IconButton onClick={onRemoveTodolist}>
                            <Delete/>
                        </IconButton>
                    </h3>
                </div>
                <AddItemForm addItem={onAddTask}/>
                {
                    tasksForTodolist.map(task => {
                        return <Task
                            key={task.id}
                            taskId={task.id}
                            title={task.title}
                            isDone={task.isDone}
                            removeTask={props.removeTask}
                            changeTaskStatus={props.changeTaskStatus}
                            changeTaskTitle={props.changeTaskTitle}
                            todolistId={props.id}
                        />
                    })
                }
                <div>
                    <Button
                        variant={props.filter === 'all' ? 'outlined' : 'text'}
                        onClick={onAllClickHandler}
                        color={"default"}
                    >All
                    </Button>
                    <Button
                        variant={props.filter === 'active' ? 'outlined' : 'text'}
                        onClick={onActiveClickHandler}
                        color={"primary"}
                    >Active
                    </Button>
                    <Button
                        variant={props.filter === 'completed' ? 'outlined' : 'text'}
                        onClick={onCompletedClickHandler}
                        color={"secondary"}
                    >Completed
                    </Button>
                </div>
            </div>
        )
    }
)
