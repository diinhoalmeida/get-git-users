import React, { useContext, useEffect, useState } from "react";
import useAlert from "../../components/alert-popup/hooks/useAlert";
import api from "../api";
import AlertAction from "../reducer/actions";
import { AlertContext } from "./alert-context";

export const AuthContext = React.createContext<any>({});

export const AuthProvider = ({ children }: any) => {
  const [userLogin, setUserLogin] = useState<string>();
  const [userData, setUserData] = useState();
  const [page, setPage] = useState<string>("projects");
  const [projectList, setProjectList] = useState<any>();
  const [arrayToShow, setArrayToShow] = useState<any>([]);
  const [projectName, setProjectName] = useState<any>();
  const [commitsList, setCommitsList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastSha, setLastSha] = useState<any>();
  const [totalProjects, setTotalProjects] = useState<number>(0);
  const [totalBranches, setTotalBranches] = useState<number>(0);
  const [originalArrayToShow, setOriginalArrayToShow] = useState<any>();
  const [buttonActive, setButtonActive] = useState<boolean>(false);
  const [state, dispatch] = useContext(AlertContext);

  const searchOnGitHub = async (loginId?: string) => {
    const { nameUser } = searchNameUserStorage();
    var isInvalidUser:boolean = false;

    var nameUserGit = nameUser ? nameUser : userLogin;

    if (loginId !== undefined) nameUserGit = loginId;

    await api
        .get(`/users/${nameUserGit}`)
        .then((response) => {
            setUserData(response.data);
        })
        .catch((err) => {
          isInvalidUser = true;
          dispatch(AlertAction.showErrorAlert('Erro ao realizar solicitação.'));
    });

    return { isInvalidUser };
  }

  const findProjectsByUser = () => {
    const { nameUser } = searchNameUserStorage();

    const nameUserGit = nameUser ? nameUser : userLogin;
  
    api
        .get(`/users/${nameUserGit}/repos`)
        .then((response) => {
            setProjectList(response.data);
            setTotalProjects(response.data.length);
            dispatch(AlertAction.showSuccessAlert('Saudações!'));
        })
        .catch((err) => {
          dispatch(AlertAction.showErrorAlert('Erro ao buscar lista de projetos.'));
    });

  }

  const findBranchesByProject = async (projectName?: string) => {
    const { nameUser } = searchNameUserStorage();

    const nameUserGit = nameUser ? nameUser : userLogin;

    await api
        .get(`repos/${nameUserGit}/${projectName}/branches`)
        .then(async (response) => {
            setPage('branch');
            setProjectName(projectName);
            setArrayToShow(response.data);
            setOriginalArrayToShow(response.data);
            setTotalBranches(response.data.length);
        })
        .catch((err) => {
            dispatch(AlertAction.showErrorAlert('Erro ao buscar branches.'));
    });

  }

  const findCommitsByBranch = async (commitSha: string) => {
    const { nameUser } = searchNameUserStorage();

    const nameUserGit: any = nameUser ? nameUser : userLogin;

    var listCommits: any = [];

    const previousArray: any = [...commitsList];

    await api
        .get(`repos/${nameUserGit}/${projectName}/commits/${commitSha}`)
        .then(async (response) => {
          const arrayCommits = arrayCommitsConstructor(response.data);
          listCommits.push(arrayCommits);
          setCommitsList([...previousArray, arrayCommits]);
          setButtonActive(true)
          if (response.data.parents[0]) {
            handleCommitList(response.data.parents[0], listCommits)
          } else {
            setButtonActive(false);
          }; 
        })
        .catch((err) => {
          dispatch(AlertAction.showErrorAlert('Erro ao buscar commits.'));
    });
  
  }

  const arrayCommitsConstructor = (response: any) => {
    return {
      message: response.commit.message,
      stats_total: response.stats.total,
      stats_additions: response.stats.additions,
      stats_deletions: response.stats.deletions,
      date: response.commit.author.date,
      files: response.files
    }
  }

  const handleCommitList = async (parents: any, commitsArrayToTable: any) => {
    const { nameUser } = searchNameUserStorage();
    var countPagination = 0;
    var newParent = parents;
    var previousArray = [...commitsList];
    
    setLoading(true);
    setButtonActive(false)

    while (countPagination !== 4) {
      await api
        .get(`repos/${nameUser}/${projectName}/commits/${newParent.sha}`)
        .then(async (response) => {
          var arrayCommits = {};

          if (response.data.parents.length > 0) {
            arrayCommits = arrayCommitsConstructor(response.data);
            countPagination = countPagination + 1;
            commitsArrayToTable.push(arrayCommits);
            newParent = response.data.parents[0];
            if (countPagination === 4) {
              setLastSha(response.data.parents[0]);
              setButtonActive(true);
            }
          } else {
            setButtonActive(false);
            countPagination = 4;
          }
        })
        .catch((err) => {
          dispatch(AlertAction.showErrorAlert('Erro ao buscar commits.'));
      });
    }

    setLoading(false);

    setCommitsList([...previousArray, ...commitsArrayToTable]);

  }

  const addMoreCommitsToList = async () => {
    const { nameUser } = searchNameUserStorage();

    var countPagination = 0;
    var previousArray = [...commitsList];
    var newArrayPagination: any = [];

    if (!lastSha) return;
    var newParent = lastSha;
    
    setLoading(true);
    setButtonActive(false);

    while (countPagination !== 5) {
      await api
        .get(`repos/${nameUser}/${projectName}/commits/${newParent.sha}`)
        .then(async (response) => {
          var arrayCommits = {};

          if (response.data.parents.length > 0) {
            arrayCommits = arrayCommitsConstructor(response.data);
            countPagination = countPagination + 1;
            newArrayPagination.push(arrayCommits);
            newParent = response.data.parents[0];

            if (countPagination === 5) {
              setLastSha(response.data.parents[0]);
              setButtonActive(true);
            }

          } else {
            countPagination = 5;
            setButtonActive(false);
            setLastSha(null);
          }
        })
        .catch((err) => {
          dispatch(AlertAction.showErrorAlert('Erro ao buscar mais commits.'));
      });
    }

    setCommitsList([...previousArray, ...newArrayPagination])
    
    setLoading(false);
    
    
  }

  const saveIdUserStorage = async (user: any) => {
    if (user.id_user_git.length === 0 || user.id_user_git === '') return;

    const { isInvalidUser }: any = verifyValidUser(user.id_user_git);
    if (!isInvalidUser) return;

    setUserLogin(user.id_user_git);
    localStorage.setItem("username", user.id_user_git);
    window.location.href = '/search-page';
  }

  const verifyValidUser = async (idUser: string) => {
    const { isInvalidUser }: any = await searchOnGitHub(idUser);

    return { isInvalidUser };
  }

  const searchNameUserStorage = () => {
    const nameUser = localStorage.getItem("username"); 
    return { nameUser }; 
  }

  const handleTitlePages = (typePage: string) => {
    setArrayToShow([...originalArrayToShow]);
    setCommitsList([]);
    setButtonActive(false);

    switch(typePage) {
        case 'projects':
            setPage('projects');
            break;
        case 'branch':
            setPage('branch');
            break;
        default:
            setPage('projects')
    }
}

  return (
    <AuthContext.Provider value={{
      saveIdUserStorage, 
      userData, 
      projectList,
      searchOnGitHub,
      findProjectsByUser,
      findBranchesByProject,
      page,
      setPage,
      setArrayToShow,
      arrayToShow,
      findCommitsByBranch,
      commitsList,
      loading,
      addMoreCommitsToList,
      totalBranches,
      totalProjects,
      handleTitlePages,
      buttonActive
    }}>
      {children}
    </AuthContext.Provider>
  );
};