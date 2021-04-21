import axios from 'axios'

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
    filter:string
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
    headers: {
        'API-KEY': '7c70269b-11f9-45b8-9ef9-b43fcec6fcf1'
    }
})


export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        return instance.put(`${todolistId}`, {title: title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete(`${todolistId}`)
    },
    postTodolist(title: string) {
        return instance.post('', {title: title})
    },
    getTodolists() {
        return instance.get<Array<TodolistType>>('')
    },

}
