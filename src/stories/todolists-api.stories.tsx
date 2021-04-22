import React, {useEffect, useState} from 'react'
import {todolistAPI, Todolist} from "../api/todolist-api";
import {AxiosResponse} from "axios";

type Response<D> = {
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
        todolistAPI.getTodolists()
            .then((res: AxiosResponse<Array<Todolist>>) => {
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
            .then((res: AxiosResponse<Response<{ item: Todolist }>>) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'e8066f16-7948-44ff-a671-ca4123a3dde4'
        todolistAPI.deleteTodolist(todolistId)
            .then((res: AxiosResponse<Response<{}>>) => {
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
            .then((res: AxiosResponse<Response<{}>>) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
