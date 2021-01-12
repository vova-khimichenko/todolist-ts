import {TaskStateType} from '../components/App';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {TaskType} from "../stories/tasks-api.stories";
import {Dispatch} from "redux";
import {taskAPI} from "../api/task-api";
import {AppRootStateType} from "./store";
import {log} from "util";

export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}
type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string
    todolistId: string
}
type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType
}
type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    taskId: string
    isDone: boolean
    todolistId: string
}
type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    taskId: string
    title: string
    todolistId: string
}
type ActionType =
    SetTasksActionType | SetTodolistsActionType | RemoveTaskActionType
    | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType
    | AddTodolistActionType | RemoveTodolistActionType

const initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'SET-TASKS': {
            const stateCopy = {...state}
            // @ts-ignore
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .filter(task => task.id !== action.taskId)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.task.todoListId]: [...state[action.task.todoListId],
                    action.task]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => {
                    return task.id === action.taskId
                        ? {
                            ...task,
                            isDone: action.isDone
                        }
                        : task
                })
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => {
                    return task.id === action.taskId
                        ? {
                            ...task,
                            title: action.title
                        }
                        : task
                })
            }
        case 'SET-TODOLISTS':
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        case 'ADD-TODOLIST':
            return {...state, [action.todolistId]: []}
        case 'REMOVE-TODOLIST':
            let copyState = {...state}
            delete copyState[action.todolistId]
            return copyState
        default:
            return state
    }
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks, todolistId}
}
export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        taskAPI.getTasks(todolistId, 30, 1)
            .then((res) => {
                const tasks = res.data.items
                const action = setTasksAC(tasks, todolistId)
                dispatch(action)
            })
    }
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const addTaskTC = (title: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        taskAPI.postTask(todolistId, title)
            .then((res) => {
                console.log(res.data.data.item)
                const task = res.data.data.item
                const action = addTaskAC(task)
                dispatch(action)
            })
    }
}
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const removeTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        taskAPI.deleteTask(todolistId, taskId)
            .then(() => {
                const action = removeTaskAC(taskId, todolistId)
                dispatch(action)
            })
    }
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId: taskId, title: title, todolistId: todolistId}
}
export const changeTaskTitleTC = (taskId: string, title: string, todolistId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        // @ts-ignore
        const task = getState().tasks[todolistId].find(t => t.id === taskId)
        if (task) {
            taskAPI.updateTask(todolistId, taskId, {
                title: title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.isDone
            }).then((res) => {
                console.log(res.data.data.item.title)
                dispatch(changeTaskTitleAC(taskId, title, todolistId))
            })
        }
    }
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId: taskId, isDone: isDone, todolistId: todolistId}
}
export const updateTaskStatusTC = (taskId: string, isDone: boolean, todolistId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        // @ts-ignore
        const task = getState().tasks[todolistId].find(t => t.id === taskId)
        if (task) {
            taskAPI.updateTask(todolistId, taskId, {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: isDone
            }).then((res) => {
                // let isDone = res.data.data.item.status === 1
                dispatch(changeTaskStatusAC(taskId, isDone, todolistId)) //значения брать из ответа | f
            })
        }
    }
}
