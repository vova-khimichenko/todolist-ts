export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitialStateType = typeof initialState
export type AppSetStatus = {
    type: typeof APP_SET_STATUS,
    status: RequestStatus
}
export type AppAction = AppSetStatus


const initialState = {
    status: 'loading' as RequestStatus
}

const APP_SET_STATUS = 'APP/SET-STATUS'

export const appReducer = (state: InitialStateType = initialState, action: AppAction): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatus):AppSetStatus => {
    return {type: APP_SET_STATUS, status}
}

