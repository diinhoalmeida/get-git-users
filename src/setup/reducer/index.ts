import AlertAction from "./actions" ;

const AlertReducer = (state: any, action: any) => {
    switch (action.type) {
        case AlertAction.SHOW_ALERT:
            return {
                ...state,
                alertShower: action.payload
            }
        default:
            return state
    }
}

export default AlertReducer