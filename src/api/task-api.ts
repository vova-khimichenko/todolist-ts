import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
    headers: {
        'API-KEY': '7c70269b-11f9-45b8-9ef9-b43fcec6fcf1'
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
    updateTask(todolistId: string, taskId: string, body: object) {
        return instance.put(`${todolistId}/tasks/${taskId}`, body)
    },
}
