import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import './home.css';
import { AuthContext } from '../../setup/context/context';
import { Input, InputAdornment } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import ButtonSubmit from '../../components/button-submit';
import { HomeInterface } from "./interface"
import { HomeTextPortuguese } from './constants';

const Home = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { saveIdUserStorage } = useContext(AuthContext);
    const { titleHome, textHome, footerHome}: HomeInterface = HomeTextPortuguese;

    return (
        <div className="body_home">
            <div className="background" />
            <div className="search_container">
                <div className="background_form"/>
                <div className="form_space">
                    <img src={require('../../assets/logos/git-hub-pixel-logo.png')} alt="logo-just-for-you"></img>  
                    <h1>{titleHome}</h1>
                    <p>{textHome}</p>
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
                        <ButtonSubmit onClick={() => {return true}} textButton={'Pesquisar'}/> 
                    </form>
                </div>    
            </div>
            <footer><p>{footerHome}</p></footer>
        </div>
    )
}

export default Home;