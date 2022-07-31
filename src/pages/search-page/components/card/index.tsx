import React, { useContext } from 'react';
import '../index.css';
import { AuthContext } from '../../../../setup/context/context';

const CardBox = (props: any) => {
    const { projectList, findBranchesByProject } = useContext(AuthContext);

    return (
        <>
            {projectList?.map((project: any, id: number) => (
                <div onClick={() => findBranchesByProject(project.name)} key={id} className="card_branch">
                    <div className="card_branch_img_space">
                        <img src={require('../../../../assets/icons/file-icon.png')} alt="file-icon" />
                    </div>
                    <div className="card_branch_title_space">
                        <div className="title_branch">
                            <div>
                                <p>{project?.name}</p>
                                <p>{project?.language}</p>
                            </div>
                            <div>
                                <p>{project?.description}</p>
                            </div>            
                        </div>
                        {/* <p>{850}</p> */}
                    </div>
                </div>
            ))}
        </>
    )

}

export default CardBox;