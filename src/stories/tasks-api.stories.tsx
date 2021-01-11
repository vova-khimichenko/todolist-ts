import React, {useEffect, useState} from 'react'
import {AxiosResponse} from "axios";
import {taskAPI} from "../api/task-api";

export type TaskType = {
    id: string
    title: string
    description: string
    todoListId: string
    order: number
    status: number
    priority: number
    startDate: string
    deadline: string
    addedDate: string
}
type ResponseType = {
    items: Array<TaskType>
    totalCount: number
    error: string
}
export type CUDResponseType<D> = {
    data: D
    messages: Array<any>
    fieldsErrors: Array<any>
    resultCode: number
}

export default {
    title: 'taskAPI'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'e01e2049-c737-43ff-83c1-01d4e81667a4'
        taskAPI.getTasks(todolistId, 30, 1)
            .then((res: AxiosResponse<ResponseType>) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'e01e2049-c737-43ff-83c1-01d4e81667a4'
        const taskTitle = 'Plans'
        taskAPI.postTask(todolistId, taskTitle)
            .then((res: AxiosResponse<CUDResponseType<{ item: TaskType }>>) => {
                debugger
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'fab7bdc5-f9f5-40c5-aaa8-0a369fe6a05d'
        const taskId = 'e716ea5a-e078-432f-916c-98de36a9cb70'
        taskAPI.deleteTask(todolistId, taskId)
            .then((res: AxiosResponse<CUDResponseType<{}>>) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'fab7bdc5-f9f5-40c5-aaa8-0a369fe6a05d'
        const taskId = '87c35499-1658-46a7-a7c0-801facaecd5f'
        taskAPI.updateTask(todolistId, taskId, {status})
            .then((res: AxiosResponse<CUDResponseType<{ item: TaskType }>>) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
