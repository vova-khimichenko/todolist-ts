import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
    headers: {
        'API-KEY': '4e8292c6-4c6d-4090-bee7-d25c2ec782dd'
    }
})


export const taskAPI = {
    getTasks(todolistId: string, pageSize: number, pageNumber: number) {
        return instance.get(`${todolistId}/tasks?count=${pageSize}&page=${pageNumber}`)
    },
    postTask(todolistId: string, title: string) {
        return instance.post(`${todolistId}/tasks`, {title: title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete(`${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put(`${todolistId}/tasks/${taskId}`, {title: title})
    },
}
