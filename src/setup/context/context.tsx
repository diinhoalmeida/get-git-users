import React, { useEffect, useState } from "react";
import api from "../api";

export const AuthContext = React.createContext<any>({});

export const AuthProvider = ({ children }: any) => {
  const [showAlert, setShowAlert] = useState(false);
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
  const [totalCommits, setTotalCommits] = useState<number>(0);
  const [originalArrayToShow, setOriginalArrayToShow] = useState<any>();
  const [buttonActive, setButtonActive] = useState<boolean>(false);

  const searchOnGitHub = () => {
    const { nameUser } = searchNameUserStorage();

    const nameUserGit = nameUser ? nameUser : userLogin;

    api
        .get(`/users/${nameUserGit}`)
        .then((response) => {
            setUserData(response.data);
        })
        .catch((err) => {
            setShowAlert(true);
    });
  }

  const findProjectsByUser = () => {
    const { nameUser } = searchNameUserStorage();

    const nameUserGit = nameUser ? nameUser : userLogin;
  
    api
        .get(`/users/${nameUserGit}/repos`)
        .then((response) => {
            setProjectList(response.data);
            setTotalProjects(response.data.length);
        })
        .catch((err) => {
            console.log(err)
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
            console.log(err)
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
          const arrayCommits = {
            message: response.data.commit.message,
            stats_total: response.data.stats.total,
            stats_additions: response.data.stats.additions,
            stats_deletions: response.data.stats.deletions,
            date: response.data.commit.author.date,
            files: response.data.files
          }

          listCommits.push(arrayCommits);
          setCommitsList([...previousArray, arrayCommits]);
          setButtonActive(true)
          if (response.data.parents[0]) handleCommitList(response.data.parents[0], listCommits);
        })
        .catch((err) => {
            console.log(err)
    });
  
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
            arrayCommits = {
              message: response.data.commit.message,
              stats_total: response.data.stats.total,
              stats_additions: response.data.stats.additions,
              stats_deletions: response.data.stats.deletions,
              date: response.data.commit.author.date,
              files: response.data.files
            }
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
            console.log(err)
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
            arrayCommits = {
              message: response.data.commit.message,
              stats_total: response.data.stats.total,
              stats_additions: response.data.stats.additions,
              stats_deletions: response.data.stats.deletions,
              date: response.data.commit.author.date,
              files: response.data.files
            }

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
            console.log(err)
      });
    }

    setCommitsList([...previousArray, ...newArrayPagination])
    
    setLoading(false);
    
    
  }

  useEffect(() => {
    setTotalCommits(commitsList.length);
  }, [commitsList])

  const saveIdUserStorage = (user: any) => {
    if (user.id_user_git.length === 0 || user.id_user_git === '') return;
    
    setUserLogin(user.id_user_git);
    localStorage.setItem("username", user.id_user_git);
    window.location.href = '/search-page';
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
      showAlert, 
      setShowAlert, 
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
      totalCommits,
      totalBranches,
      totalProjects,
      handleTitlePages,
      buttonActive
    }}>
      {children}
    </AuthContext.Provider>
  );
};