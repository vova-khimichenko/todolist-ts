import {FilterValuesType, TodolistType} from "../components/App";
import {v1} from "uuid";
import {todolistAPI} from "../api/todolist-api";
import {Dispatch} from "redux";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    todolistId: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todolistId: string
}
export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
}

type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    title: string
    id: string
}
type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    filter: FilterValuesType
    id: string
}
type ActionType = SetTodolistsActionType | RemoveTodolistActionType
    | AddTodolistActionType | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

const initialState: Array<TodolistType> = []

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionType) => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({
                ...tl,
                filter: 'all'
            }))
        case 'REMOVE-TODOLIST':
            return state.filter(todolist => todolist.id !== action.todolistId)
        case 'ADD-TODOLIST':
            return [...state, {
                id: action.todolistId,
                title: action.title,
                filter: "all"
            }]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(todolist => {
                if (todolist.id === action.id) {
                    return {
                        ...todolist,
                        title: action.title
                    }
                } else return todolist
            })
        case 'CHANGE-TODOLIST-FILTER':
            let todolist = state.find(todolist => todolist.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]   //как в копии стейта изменился фильтр
        default:
            return state
    }
}

export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodolistsActionType => {
    return {type: 'SET-TODOLISTS', todolists}
}
export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    todolistAPI.getTodolists()
        .then((res) => {
            // @ts-ignore
            dispatch(setTodolistsAC(res.data))
        })
}
export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', todolistId: todolistId}
}
export const removeTodolistsTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodolist(todolistId)
        .then(() => {
            dispatch(removeTodolistAC(todolistId))
        })
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}
export const changeTodolistTitleAC = (title: string, todolistId: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title: title, id: todolistId}
}
export const changeTodolistFilterAC = (filter: FilterValuesType, todolistId: string): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter: filter}
}
