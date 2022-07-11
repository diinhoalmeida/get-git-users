import React, { useContext, useState, Children } from "react";
import api from "../api";

export const AuthContext = React.createContext<any>({});

export const AuthProvider = ({ children }: any) => {
  const [showAlert, setShowAlert] = useState(false);
  const [userBranches, setBranches] = useState();
  const [userIdName, setUserIdName] = useState();
  const [userData, setUserData] = useState();

  const searchOnGitHub = (userData: any) => {
    const nameUserGit = userData;
    api
        .get(`${nameUserGit}`)
        .then((response) => {
            console.log(response.data)
            findBranchesByUser(nameUserGit)
            setUserData(response.data);
            setShowAlert(true)
        })
        .catch((err) => {
            setShowAlert(true);
    });
  }

  const findBranchesByUser = (nameUserGit: string) => {
    api
        .get(`${nameUserGit}/respos`)
        .then((response) => {
            console.log(response.data)
            setBranches(response.data);
        })
        .catch((err) => {
            console.log(err)
    });
  }

  const saveIdUserStorage = (user: any) => {
    if (user.id_user_git.length === 0 || user.id_user_git === '') return;
    localStorage.setItem("username", user.id_user_git);  
  }

  return (
    <AuthContext.Provider value={{
      userIdName, 
      saveIdUserStorage, 
      userData, 
      userBranches, 
      setBranches, 
      showAlert, 
      setShowAlert, 
      searchOnGitHub
    }}>
      {children}
    </AuthContext.Provider>
  );
};