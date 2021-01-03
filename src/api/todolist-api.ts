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
        'API-KEY': '71b5e96e-12f6-4f56-9add-74f64f7af655'
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
