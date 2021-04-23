export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppSetStatus = {
    type: typeof APP_SET_STATUS,
    status: RequestStatus
}
export type RequestError = string | null
export type AppSetError = {
    type: typeof APP_SET_ERROR,
    error: RequestError
}
export type AppAction = AppSetStatus | AppSetError
type InitialStateType = typeof initialState


const initialState = {
    status: 'loading' as RequestStatus,
    error: 'ERROR' as RequestError
    // error: null as RequestError
}

const APP_SET_STATUS = 'APP/SET-STATUS'
const APP_SET_ERROR = 'APP/SET-ERROR'

export const appReducer = (state: InitialStateType = initialState, action: AppAction): InitialStateType => {
    switch (action.type) {
        case APP_SET_STATUS:
            return {...state, status: action.status}
        case APP_SET_ERROR:
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatus): AppSetStatus => {
    return {type: APP_SET_STATUS, status}
}
export const setAppErrorAC = (error: RequestError): AppSetError => {
    return {type: APP_SET_ERROR, error}
}

