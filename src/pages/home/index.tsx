import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import './home.css';
import { AuthContext } from '../../setup/context/context';
import Button from '@mui/material/Button';
import { Alert, Input, InputAdornment, InputLabel, Snackbar, Stack } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

const Home = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { saveIdUserStorage, showAlert, setShowAlert } = useContext(AuthContext);

    const handleClose = () => {
        setShowAlert(false);    
    }

    return (
        <div className="body_home">
            <div className="background" />
            <div className="search_container">
                <div className="background_form"/>
                <div className="form_space">
                    <img src={require('../../assets/logos/git-hub-pixel-logo.png')} alt="logo-just-for-you"></img>  
                    <h1>PESQUISAR</h1>
                    <p>Pesquise abaixo pelo nome do usuário GitHub</p>
                    <form onSubmit={handleSubmit(saveIdUserStorage)}>
                            <Input
                                type="text" 
                                {...register("id_user_git")}
                                id="input-with-icon-adornment"
                                startAdornment={
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            }
                        />
                        <Button type="submit" variant="contained">
                            Pesquisar
                        </Button> 
                    </form>
                </div>    
            </div>
            <footer><p>©Todos os direitos reservados</p></footer>
        </div>
    )
}

export default Home;