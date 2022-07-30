import { createContext, useReducer } from 'react'
import { AlertTypes } from '../../components/alert-popup/interface' 
import reducer from '../reducer/'

interface IAlertShower {
    type: AlertTypes
    message: string
}

interface IAlertState {
    alertShower?: IAlertShower
}

const initialState: IAlertState = {
    alertShower: {
        type: AlertTypes.NONE,
        message: ''
    }
}

export const AlertContext = createContext<any>(initialState)

export const AlertProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const value: any = [state, dispatch]

    return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
}