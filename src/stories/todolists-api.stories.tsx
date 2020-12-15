import React, {useEffect, useState} from 'react'
import {todolistAPI, TodolistType} from "../api/todolist-api";
import {AxiosResponse} from "axios";

type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<any>
    data: D
}

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist()
            .then((res: AxiosResponse<Array<TodolistType>>) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistTitle = 'New todolist'
        todolistAPI.postTodolist(todolistTitle)
            .then((res: AxiosResponse<ResponseType<{ item: TodolistType }>>) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'cac69032-1006-4c35-9a5a-7cff1af17c80'
        todolistAPI.deleteTodolist(todolistId)
            .then((res: AxiosResponse<ResponseType<{}>>) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '8aef8a87-3939-40d4-88de-74ec328c8921'
        todolistAPI.updateTodolist(todolistId, 'SOME NEW TITLE')
            .then((res: AxiosResponse<ResponseType<{}>>) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
