import React, { useState } from "react";
import api from "../api";

export const AuthContext = React.createContext<any>({});

export const AuthProvider = ({ children }: any) => {
  const [showAlert, setShowAlert] = useState(false);
  const [userLogin, setUserLogin] = useState<string>();
  const [userData, setUserData] = useState();
  const [page, setPage] = useState<string>("projects");
  const [projectList, setProjectList] = useState<any>();
  const [arrayToShow, setArrayToShow] = useState<any>([]);

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
            setArrayToShow(response.data);
        })
        .catch((err) => {
            console.log(err)
    });

  }

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
      arrayToShow
    }}>
      {children}
    </AuthContext.Provider>
  );
};