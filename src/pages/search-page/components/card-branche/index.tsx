import React, { useContext, useEffect, useState } from 'react';
import '../index.css';
import { AuthContext } from '../../../../setup/context/context';

const CardBranch = (props: any) => {
    const {collectLastMessageCommmit, setArrayToShow, arrayToShow, page, arraytoShowByType } = useContext(AuthContext);

    const selectBranch = (idBranch: number) => {
        var previousArray = [...arrayToShow];
        const filterArray = arrayToShow[idBranch];
        previousArray = filterArray;
        setArrayToShow([previousArray]);
    }

    return (
        <>
            {arrayToShow?.map((project: any, id: number) => (
                <div onClick={() => selectBranch(id)} key={id} className="card_branch">
                    <div className="card_branch_img_space">
                        <img src={require('../../../../assets/icons/file-icon.png')} alt="file-icon" />
                    </div>
                    <div className="card_branch_title_space">
                        <div className="title_branch">
                            <div>
                                <p>{project?.name}</p>
                                <p>{project?.commit.sha}</p>
                            </div>
                            <div>
                                <p>{project?.commit.url}</p>
                            </div>            
                        </div>
                        <p>{850}</p>
                    </div>
                </div>
            ))}
        </>
    )

}

export default CardBranch;