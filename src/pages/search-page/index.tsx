import React, { useEffect, useContext } from 'react';
import './index.css';
import { AuthContext } from '../../setup/context/context';
import {
    CardBox,
    CardBranch,
    CollapsibleTable,
    CircularIndeterminate,
    TitlePage
} from './components/index';
import { Button } from '@mui/material';


const SearchPage = () => {
    const { searchOnGitHub, userData, page, findProjectsByUser, loading, addMoreCommitsToList } = useContext(AuthContext);

    useEffect(() => {
        searchOnGitHub();
        findProjectsByUser();
    }, []);

    return (
        <div className="search_body">
            <div className="search_container">
                <TitlePage />
                <div className="branchs_list">
                    {page === 'projects' && <CardBox />}
                    {(page === 'branch' || page === 'commits') && <CardBranch />}
                    {page === 'commits' && <CollapsibleTable />}
                    {loading && <CircularIndeterminate />}
                    {page === 'commits' && 
                        <Button onClick={() => addMoreCommitsToList()} variant="contained" className="button_load_more">
                            Pesquisar Novamente
                        </Button>
                    }
                </div>
                <footer className="search_container_footer">
                    <div className="data_user_space">
                        <img src={`${userData?.avatar_url}`} alt="binary-wallpaper" />
                        <div className="name_nick_space">
                            <p>{userData?.name}</p>
                            <p>{userData?.login}</p>
                        </div>
                    </div>
                    <Button onClick={() => window.location.href = '/'} type="submit" variant="contained">
                        Pesquisar Novamente
                    </Button> 
                </footer>
            </div>
        </div>
    )
}

export default SearchPage;