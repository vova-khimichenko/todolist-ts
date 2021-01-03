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
    title: 'todolistAPI'
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
        const todolistId = 'be773858-e8b3-4c7a-a5f8-4d71a5e47a91'
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
        const todolistId = '44d34ade-f35d-4f6b-a6d4-afd4b6a7a4b9'
        todolistAPI.updateTodolist(todolistId, 'SOME TITLE')
            .then((res: AxiosResponse<ResponseType<{}>>) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
