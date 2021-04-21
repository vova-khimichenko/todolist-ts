export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitialStateType = typeof initialState
export type AppSetStatus = {
    type: typeof APP_SET_STATUS,
    status: RequestStatusType
}
export type ActionsType = AppSetStatus


const initialState = {
    status: 'loading' as RequestStatusType
}

const APP_SET_STATUS = 'APP/SET-STATUS'

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType):AppSetStatus => {
    return {type: APP_SET_STATUS, status}
}

