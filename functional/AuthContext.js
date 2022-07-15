import { createContext, useContext, useEffect, useState } from 'react';
import AuthService from './AuthService';

const AuthContext = createContext({
    auth: null,
    setAuth: () => {},
    user: null,
    setUser: () => {}
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState({
        "token": "",
        "type": "",
        "id": "",
        "username": "",
        "email": "",
        "roles": [
            ""
        ]
    });

    useEffect(() => {
        const isAuth = () => {
            try {
                const user = AuthService.getCurrentUser();
                if (user) {
                    setAuth(AuthService.isAuthenticated());
                    setUser(user);
                }
            } catch(error) {
                setUser(null);
            }
        };

        isAuth();
    }, [auth]);

    return (
        <AuthContext.Provider value={{ auth, setAuth, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
