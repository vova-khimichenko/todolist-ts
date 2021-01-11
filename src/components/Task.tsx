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

export const Task = React.memo(({
                                    changeTaskStatus,
                                    changeTaskTitle,
                                    isDone,
                                    removeTask,
                                    taskId,
                                    title,
                                    todolistId
                                }: TaskPropsType) => {
    console.log("Task called" + ", " + "propsIsDone: " + isDone)
    const onClickHandler = useCallback(() => {
        removeTask(taskId, todolistId)
    }, [removeTask, taskId, todolistId])
    const onChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(taskId, event.target.checked, todolistId);
    }, [taskId, todolistId, changeTaskStatus])
    const onChangeTaskTitle = useCallback((title: string) => {
        changeTaskTitle(taskId, title, todolistId)
    }, [changeTaskTitle, taskId, todolistId])

    return <div key={taskId}
                className={isDone ? 'is-done' : ''}>
        <Checkbox
            color={"primary"}
            checked={!isDone ? false : isDone}
            onChange={onChangeHandler}
        />
        <EditedSpan value={title}
                    changeTitle={onChangeTaskTitle}
        />
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})