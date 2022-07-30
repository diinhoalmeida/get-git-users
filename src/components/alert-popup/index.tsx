import { Card, CardContent, Alert, AlertTitle } from '@mui/material'
import Dialog from '@mui/material/Dialog';
import React, { useContext, useEffect, useState } from 'react'
import { AlertContext } from '../../setup/context/alert-context' 
import { AlertTypes } from './interface' 

export default function AlertPopup() {
    const [state, dispatch] = useContext(AlertContext)

    const [open, setOpen] = useState(false)
    const [alertType, setAlertType] = useState<any>(AlertTypes.NONE)
    const [message, setMessage] = useState<string>('Some Message')

    useEffect(() => {
        const { message, type } = state.alertShower
        setAlertType(type)
        setMessage(message)
        if (type !== AlertTypes.NONE) setOpen(true)
    }, [state.alertShower])

    const handleClose = () => setOpen(false)
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby='max-width-dialog-title'>
            <Card variant='outlined'>
                <CardContent>
                    <Alert severity={alertType}>
                        <AlertTitle>{message}</AlertTitle>
                    </Alert>
                </CardContent>
            </Card>
        </Dialog>
    )
}