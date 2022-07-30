import * as React from 'react';
import Alert from '@mui/material/Alert';
import useAlert from '../../../components/alert-popup/hooks/useAlert'; 

import { AlertTypes } from '../../../components/alert-popup/interface'; 

export default class AlertAction {
    static SHOW_ALERT = 'SHOW_ALERT'

    static showSuccessAlert = (message: string) => {
        return {
            type: AlertAction.SHOW_ALERT,
            payload: { message, type: AlertTypes.SUCCESS }
        }
    }

    static showErrorAlert = (message: string) => {
        return {
            type: AlertAction.SHOW_ALERT,
            payload: { message, type: AlertTypes.ERROR }
        }
    }
}
//error, warning, info, success