import React, { useEffect, useContext } from 'react';
import './index.css';
import { AuthContext } from '../../setup/context/context';
import CardBox from './components/card';
import { Button } from '@mui/material';
import CardBranch from './components/card-branche';


const SearchPage = () => {
    const { searchOnGitHub, userData, page, findProjectsByUser } = useContext(AuthContext);

    useEffect(() => {
        searchOnGitHub();
        findProjectsByUser();
    }, []);

    return (
        <div className="search_body">
            <div className="search_container">
                <div className="title_page">
                    <div className="title_page_left">
                        projetos / branches / commits
                    </div>
                    <div className="title_page_right">
                        <p>Total de Projetos:</p>
                        <p>80</p>
                    </div>
                </div>
                <div className="branchs_list">
                    {page === 'projects' && <CardBox />}
                    {(page === 'branch' || page === 'commits') && <CardBranch />}
                </div>
                <footer className="search_container_footer">
                    <div className="data_user_space">
                        <img src={`${userData?.avatar_url}`} alt="binary-wallpaper" />
                        <div className="name_nick_space">
                            <p>{userData?.name}</p>
                            <p>{userData?.login}</p>
                        </div>
                    </div>
                    <Button onClick={() => window.location.href = '/home'} type="submit" variant="contained">
                        Pesquisar Novamente
                    </Button> 
                </footer>
            </div>
        </div>
    )
}

export default SearchPage;