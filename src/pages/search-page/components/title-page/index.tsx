import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../../../setup/context/context';
import './index.css';
import useWindowDimensions from './hooks';

const projectsSelected = (maxWidth: any) => {
    const { userData, page, handleTitlePages } = useContext(AuthContext);
    
    if (page === 'projects') {
        return (
            <div className="title_page_left_projects">
                <p>{userData?.login}</p>
                {maxWidth && (<p>/</p>)}
            </div>
        )    
    } else if (page === 'branch') {
        return (
            <div className="title_page_left_branch">
                <p onClick={() => handleTitlePages('projects')}>{userData?.login}</p>
                {maxWidth && (<p>/</p>)}
                <p onClick={() => handleTitlePages('branch')}>branches</p>
                {maxWidth && (<p>/</p>)}
            </div>
        )    
    } else {
        return (
            <div className="title_page_left_commit">
                <p onClick={() => handleTitlePages('projects')}>{userData?.login}</p>
                {maxWidth && (<p>/</p>)}
                <p onClick={() => handleTitlePages('branch')}>branches</p>
                {maxWidth && (<p>/</p>)}
                <p>commits</p>
            </div>
        ) 
    }
}

const TitlePage = () => {
    const [maxWidth, setMaxWidth] = useState<boolean>(true);
    const { totalProjects, totalBranches, totalCommits, page, commitsList } = useContext(AuthContext);
    
    const { width } = useWindowDimensions()

    useEffect(() => {
        if (width <= 630) {
            setMaxWidth(false);
        } else {
            setMaxWidth(true);
        }
    }, [width]);

    return (
        <div className="title_page">
            {projectsSelected(maxWidth)}
            <div className="title_page_right">
                <p>
                    Total de  
                    {
                        page === 'projects' ? 
                        (
                            <> Projetos</>
                        )
                        : page === 'branch' ?
                        (
                            <> Branches</>
                        )
                        :
                        (
                            <> Commits</>
                        )
                    }
                    :
                </p>
                <p>
                    {
                        page === 'projects' ? 
                        (
                            <> {totalProjects}</>
                        )
                        : page === 'branch' ?
                        (
                            <> {totalBranches}</>
                        )
                        :
                        (
                            <> {commitsList.length}</>
                        )
                    }
                </p>
            </div>
        </div>
    )
}

export default TitlePage;