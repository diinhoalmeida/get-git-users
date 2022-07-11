import React, { useEffect, useContext } from 'react';
import './index.css';
import { AuthContext } from '../../setup/context/context';

const SearchPage = () => {
    const { searchOnGitHub, userData } = useContext(AuthContext);

    useEffect(() => {
        const userName = localStorage.getItem('username');
        searchOnGitHub(userName);
    })

    useEffect(() => {
        console.log(userData);
    }, [userData])

    return (
        <div className="card_container">
            <div className="header">
                <img src={`${userData?.avatar_url}`} alt="binary-wallpaper" style={{width: 50}}/>
            </div>
            <div className="card_box">
                <div>
                    <img src={require('../../assets/icons/file-icon.png')} alt="file-icon" />
                </div>
                <div className="name_branch_language_space">
                    <p>
                        aula01
                    </p>
                    <p>
                        JavaScript
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SearchPage;