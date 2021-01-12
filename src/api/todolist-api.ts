import axios from 'axios'

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
    headers: {
        'API-KEY': '4e8292c6-4c6d-4090-bee7-d25c2ec782dd'
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
