import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import './index.css';
import { AuthContext } from '../../setup/context/context';
import { Alert, Snackbar, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { saveIdUserStorage, showAlert, setShowAlert } = useContext(AuthContext);

    const handleClose = () => {
        setShowAlert(false);    
    }

    return (
        <div className="body_home">
            <div className="content_home">
                <div>
                    <img src={require('../../assets/logos/just-for-you-logo.png')} alt="logo-just-for-you"></img>        
                </div>
                <div>
                    <form onSubmit={handleSubmit(saveIdUserStorage)}>
                        <input type="text" {...register("id_user_git")} />
                        <Link to="/search-page" type="submit">Enviar</Link>
                    </form>
                </div>
            </div>
            <Stack spacing={2} sx={{ position: 'absolute', width: '100%' }}>
                <Snackbar open={showAlert} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        This is a success message!
                    </Alert>
                </Snackbar>
            </Stack>
        </div>
    )
}

export default Home;