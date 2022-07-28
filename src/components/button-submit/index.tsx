import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import './index.css';

interface ButtonSubmitInterface {
    onClick: Function,
    textButton: string,
    activeButton?: boolean
}

const ButtonSubmit = (props: ButtonSubmitInterface)  => {

    return (
        <Button 
            onClick={() => props.onClick()} 
            variant="contained" 
            type='submit'
            className="button_load_more"
            disabled={props.activeButton !== undefined && !props.activeButton}
        >
            {props.textButton}
        </Button>
    )
}

export default ButtonSubmit;