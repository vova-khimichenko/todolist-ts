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
        'API-KEY': 'cbecddab-9d5d-495d-88be-023444f7d112'
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
    getTodolist() {
        return instance.get<Array<TodolistType>>('')
    },

}
