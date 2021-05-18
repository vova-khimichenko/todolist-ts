import {TaskState} from '../components/app/App';
import {AddTodolist, RemoveTodolist, SetTodolists} from "./todolists-reducer";
import {Task} from "../stories/tasks-api.stories";
import {taskAPI} from "../api/task-api";
import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";
import {AppAction, setAppErrorAC, setAppStatusAC} from "../components/app/app-reducer";
import {RootState} from "./store";


type SetTasks = {
    type: 'SET-TASKS'
    tasks: Array<Task>
    todolistId: string
}
type RemoveTask = {
    type: 'REMOVE-TASK',
    taskId: string
    todolistId: string
}
type AddTask = {
    type: 'ADD-TASK',
    task: Task
}
type ChangeTaskStatus = {
    type: 'CHANGE-TASK-STATUS',
    taskId: string
    isDone: boolean
    todolistId: string
}
type ChangeTaskTitle = {
    type: 'CHANGE-TASK-TITLE',
    taskId: string
    title: string
    todolistId: string
}
type TaskAction =
    SetTasks
    | SetTodolists
    | RemoveTask
    | AddTask
    | ChangeTaskStatus
    | ChangeTaskTitle
    | AddTodolist
    | RemoveTodolist
    | AppAction
export type Thunk<A extends AnyAction> = ThunkAction<void, RootState, unknown, A>


const initialState = {}

export const tasksReducer = (state: TaskState = initialState, action: TaskAction): TaskState => {
    switch (action.type) {
        case 'SET-TASKS': {
            const stateCopy = {...state}
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

export const setTasksAC = (tasks: Array<Task>, todolistId: string): SetTasks => {
    return {type: 'SET-TASKS', tasks, todolistId}
}
export const fetchTasksTC = (todolistId: string): Thunk<TaskAction> => dispatch => {
    dispatch(setAppStatusAC('loading'))
    taskAPI.getTasks(todolistId, 30, 1).then(res => {
        if (res.data.items.length) {
            dispatch(setTasksAC(res.data.items, todolistId))
        } else {
            dispatch(setAppErrorAC('Do not get tasks'))
        }
        dispatch(setAppStatusAC('succeeded'))
    })
}
export const addTaskAC = (task: Task): AddTask => {
    return {type: 'ADD-TASK', task}
}
export const addTaskTC = (title: string, todolistId: string): Thunk<TaskAction> => dispatch => {
    dispatch(setAppStatusAC('loading'))
    taskAPI.postTask(todolistId, title).then(res => {
        if (res.data.resultCode === 0) {
            const task = res.data.data.item
            dispatch(addTaskAC(task))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            if (res.data.messages.length) {
                dispatch(setAppErrorAC(res.data.messages[0]))
            } else {
                dispatch(setAppErrorAC('Some error occurred'))
            }
            dispatch(setAppStatusAC('failed'))
        }
    })
}
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTask => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const removeTaskTC = (todolistId: string, taskId: string): Thunk<TaskAction> => dispatch => {
    dispatch(setAppStatusAC('loading'))
    taskAPI.deleteTask(todolistId, taskId).then(() => {
        dispatch(removeTaskAC(taskId, todolistId))
        dispatch(setAppStatusAC('succeeded'))
    })
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitle => {
    return {type: 'CHANGE-TASK-TITLE', taskId: taskId, title: title, todolistId: todolistId}
}
export const changeTaskTitleTC = (taskId: string, title: string, todolistId: string): Thunk<TaskAction> => {
    return (dispatch, getState) => {
        const task = getState().tasks[todolistId].find(t => t.id === taskId)
        if (task) {
            dispatch(setAppStatusAC('loading'))
            taskAPI.updateTask(todolistId, taskId, {
                title: title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.isDone
            }).then((res) => {
                dispatch(changeTaskTitleAC(taskId, title, todolistId))
                dispatch(setAppStatusAC('succeeded'))
            })
        }
    }
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatus => {
    return {type: 'CHANGE-TASK-STATUS', taskId: taskId, isDone: isDone, todolistId: todolistId}
}
export const updateTaskStatusTC = (taskId: string, isDone: boolean, todolistId: string): Thunk<TaskAction> => {
    return (dispatch, getState) => {
        const task = getState().tasks[todolistId].find(t => t.id === taskId)
        if (task) {
            dispatch(setAppStatusAC('loading'))
            taskAPI.updateTask(todolistId, taskId, {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: isDone
            }).then((res) => {
                dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
                dispatch(setAppStatusAC('succeeded'))
            })
        }
    }
}
