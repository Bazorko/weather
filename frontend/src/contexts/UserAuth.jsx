import React, { useState, useEffect } from "react";

export const AuthContext = React.createContext(undefined);

export const AuthProvider = (props) => {
    const [user, setUser] = useState(null);
    const login = (userData) => {
        if(userData){
            setUser(userData);
            const { username } = userData;
            localStorage.setItem("username", username);
        }
    }
    const logout = () => {
        setUser(null);
        localStorage.removeItem("username");
    }
    return(
        <AuthContext.Provider value={{user, login, logout}}>
            {props.children}
        </AuthContext.Provider>
    );
}