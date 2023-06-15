import { useState, createContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuth, setAuth] = useState(localStorage.getItem('token') || false);
    const [token, setToken] = useState(localStorage.getItem('token') || false);
    const [role, setRole] = useState(localStorage.getItem('token') || false);
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') || false);
    const [userData, setUserData] = useState({});
    // if (localStorage.getItem('token')) {
    //     setAuth(true);
    // }
    return (
        <AuthContext.Provider
            value={{
                isAuth,
                setAuth,
                token,
                setToken,
                isAdmin,
                setIsAdmin,
                role,
                setRole,
                userData,
                setUserData,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
