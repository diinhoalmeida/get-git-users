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
import ButtonSubmit from '../../components/button-submit';


const SearchPage = () => {
    const { buttonActive, searchOnGitHub, userData, page, findProjectsByUser, loading, addMoreCommitsToList } = useContext(AuthContext);

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
                        <div className="button_more_commits_space">
                            <ButtonSubmit 
                                onClick={() => addMoreCommitsToList()}
                                textButton={`Carregar commits`}
                                activeButton={buttonActive}
                            />
                        </div>
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
                    <ButtonSubmit 
                        onClick={() => window.location.href = '/'}
                        textButton={`Pesquisar novamente`}
                    />
                </footer>
            </div>
        </div>
    )
}

export default SearchPage;