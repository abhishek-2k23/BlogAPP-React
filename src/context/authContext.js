import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [loginStatus, setLoginStatus] = useState(false);
  const [Snav,setSnav]  = useState(false);

  const logout = async () => {
    try{
    await axios.post(`${process.env.REACT_APP_BackEndURL}auth/logout`);
    setLoginStatus(false);
    sessionStorage.removeItem("loginStatusInfo");
    setCurrentUser(null);
    }catch(err){
      console.log("Error during logout : ",err.message);
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);


  const val = {
    currentUser,
    logout,
    loginStatus,
    setLoginStatus,
    setCurrentUser,Snav,setSnav
  };
  return <AuthContext.Provider value={val}>{children}</AuthContext.Provider>;
};
