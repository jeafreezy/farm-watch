import React, { useState, useContext, createContext, useEffect } from 'react';
import Alert from '../components/ui/Alert';
import { AuthService } from '../services/AuthService';

export type TAuthContext = {
    login: () => void;
    isAuthenticated: boolean;
    displayName: string | null;
    displayPicture: string | null;
    loading: boolean;
    logOut: () => void;
};

const AuthContext = createContext<TAuthContext | null>(null);

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [displayName, setDisplayName] = useState(null);
    const [displayPicture, setDisplayPicture] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchLocalData = () => {
        //check if data exists in local storage, if yes, update state
        const localUserData = localStorage.getItem('farm_watch_user');
        if (localUserData) {
            let parsedLocalUserData = JSON.parse(localUserData);
            const { display_name, img } = parsedLocalUserData;
            setIsAuthenticated(true);
            setDisplayName(display_name);
            setDisplayPicture(img.href);
        }
    };

    const getUserData = async (code: string | null, state: string | null) => {
        const { data, status, message } =
            await new AuthService().getUserDetails(code, state);
        if (status === 200) {
            setLoading(false);
            const { img, display_name } = data.data;
            setIsAuthenticated(true);
            setDisplayName(display_name);
            setDisplayPicture(img.href);
            Alert('success', `${message}`);
            localStorage.setItem('farm_watch_user', JSON.stringify(data.data));
        } else {
            setLoading(false);
            Alert('error', `${message}`);
        }
    };

    const login = async () => {
        setLoading(true);
        await new AuthService().login();
    };

    const logOut = async () => {
        localStorage.removeItem('farm_watch_user');
        setDisplayName(null);
        setDisplayPicture(null);
        setIsAuthenticated(false);
        Alert('success', 'Logout successfully');
    };

    useEffect(() => {
        const params = new URL(window.location.href).searchParams;
        const code = params.get('code');
        const state = params.get('state');
        if (!code && !state) return;
        getUserData(code, state);
        window.history.pushState({}, '', window.location.origin);
    }, []);

    useEffect(() => {
        if (displayName || displayPicture) return;
        fetchLocalData();
    }, [displayName, displayPicture]);
    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                login,
                displayName,
                displayPicture,
                loading,
                logOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
