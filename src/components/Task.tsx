import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditedSpan} from "./EditedSpan";
import {Delete} from "@material-ui/icons";

type TaskPropsType = {
    taskId: string
    title: string
    isDone: undefined | boolean
    todolistId: string
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    // console.log("Task called" + ", " + "propsIsDone: " + props.isDone)

    const onClickHandler = useCallback(() => {
        props.removeTask(props.taskId, props.todolistId)
    }, [props.removeTask, props.taskId, props.todolistId])
    const onChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.taskId, event.target.checked, props.todolistId);
    }, [props.taskId, props.todolistId, props.changeTaskStatus])
    const onChangeTaskTitle = useCallback((title: string) => {
        props.changeTaskTitle(props.taskId, title, props.todolistId)
    }, [props.taskId, props.todolistId])

    return <div key={props.taskId}
                className={props.isDone ? 'is-done' : ''}>
        <Checkbox
            color={"primary"}
            checked={!props.isDone ? false : props.isDone}
            onChange={onChangeHandler}
        />
        <EditedSpan value={props.title}
                    changeTitle={onChangeTaskTitle}
        />
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})