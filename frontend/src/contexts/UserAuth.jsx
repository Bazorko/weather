import React, { useState } from "react";

export const AuthContext = React.createContext();

export const AuthProvider = (props) => {
    const [user, setUser] = useState(null);
    const login = (userData) => {
        if(userData){
            setUser(userData);
        }
    }
    const logout = () => {
        setUser(null);
    }
    return(
        <AuthContext.Provider value={{user, login, logout}}>
            {props.children}
        </AuthContext.Provider>
    );
}