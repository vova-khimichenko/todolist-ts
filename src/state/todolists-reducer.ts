import {FilterValues} from "../components/App";
import {v1} from "uuid";
import {todolistAPI, Todolist} from "../api/todolist-api";
import {AnyAction, Dispatch} from "redux";
import {AppAction, setAppStatusAC} from "../components/app-reducer";
import {ThunkAction} from "redux-thunk";
import {RootState} from "./store";


export type RemoveTodolist = {
    type: 'REMOVE-TODOLIST',
    todolistId: string
}
export type AddTodolist = {
    type: 'ADD-TODOLIST',
    title: string
    todolistId: string
}
export type SetTodolists = {
    type: 'SET-TODOLISTS'
    todolists: Array<Todolist>
}
type ChangeTodolistTitle = {
    type: 'CHANGE-TODOLIST-TITLE',
    title: string
    id: string
}
type ChangeTodolistFilter = {
    type: 'CHANGE-TODOLIST-FILTER',
    filter: FilterValues
    id: string
}
type TodolistAction = SetTodolists | RemoveTodolist | AddTodolist | ChangeTodolistTitle | ChangeTodolistFilter
    | AppAction
export type Thunk<A extends AnyAction> = ThunkAction<void, RootState, unknown, A>


const initialState: Array<Todolist> = []

export const todolistsReducer = (state: Array<Todolist> = initialState, action: TodolistAction) => {
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

export const setTodolistsAC = (todolists: Array<Todolist>): SetTodolists => {
    return {type: 'SET-TODOLISTS', todolists}
}
export const fetchTodolistsTC = (): Thunk<TodolistAction> => (dispatch: Dispatch<TodolistAction>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })

}
export const removeTodolistAC = (todolistId: string): RemoveTodolist => {
    return {type: 'REMOVE-TODOLIST', todolistId: todolistId}
}
export const removeTodolistTC = (todolistId: string): Thunk<TodolistAction> => (dispatch: Dispatch<TodolistAction>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.deleteTodolist(todolistId)
        .then(() => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const addTodolistAC = (title: string): AddTodolist => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}
export const addTodolistTC = (title: string): Thunk<TodolistAction> => (dispatch: Dispatch<TodolistAction>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.postTodolist(title)
        .then(() => {
            dispatch(addTodolistAC(title))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const changeTodolistTitleAC = (title: string, todolistId: string): ChangeTodolistTitle => {
    return {type: 'CHANGE-TODOLIST-TITLE', title: title, id: todolistId}
}
export const changeTodolistTitleTC = (title: string, todolistId: string): Thunk<TodolistAction> => {
    return (dispatch: Dispatch<TodolistAction>) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.updateTodolist(todolistId, title)
            .then(() => {
                dispatch(changeTodolistTitleAC(title, todolistId))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}
export const changeTodolistFilterAC = (filter: FilterValues, todolistId: string): ChangeTodolistFilter => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter: filter}
}
