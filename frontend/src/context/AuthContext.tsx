import React, { useState, useContext, createContext, useEffect } from 'react';
import { TAuthContext } from '../types';
import { Toast } from '../utils/toast';

const AuthContext = createContext<TAuthContext | null>(null);

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [displayName, setDisplayName] = useState(null);
    const [displayPicture, setDisplayPicture] = useState(null);
    const [token, setToken] = useState<null | string>(null); //token === code
    const [authState, setAuthState] = useState<null | string>(null);
    const [loading, setLoading] = useState(false);

    const width = 400;
    const height = 400;
    const params =
        'modal=yes,alwaysRaised=yes' +
        ', width=' +
        width +
        ', height=' +
        height;
    const osmAuthUrl = `${process.env.REACT_APP_OSM_AUTH_URL}?response_type=code&scope=read_prefs&client_id=${process.env.REACT_APP_OSM_OAUTH2_CLIENT_ID}&state=${process.env.REACT_APP_OSM_AUTH_STATE}&redirect_uri=${process.env.REACT_APP_OSM_REDIRECT_URI}`;

    const authenticateUser = async (
        code: string | null,
        state: string | null
    ) => {
        if (state === process.env.REACT_APP_OSM_AUTH_STATE) {
            setToken(code);
            setAuthState(state);
            setLoading(true);

            const res = await fetch(
                `${process.env.REACT_APP_BASE_URL}auth/login/?code=${code}&state=${state}&service=osm`,
                {
                    method: 'post',
                    headers: {
                        Accepts: 'application/json',
                    },
                    // body:JSON.stringify({
                    //     "code":code,
                    //     "state":state,
                    //     "service":"osm"
                    // })
                }
            );

            const data = await res.json();

            if (res.ok) {
                setLoading(false);
                const { img, display_name } = data.data;
                setIsAuthenticated(true);
                setDisplayName(display_name);
                setDisplayPicture(img.href);
                Toast('success', 'Login successful');
                localStorage.setItem(
                    'farm_watch_user',
                    JSON.stringify(data.data)
                );
                localStorage.setItem(
                    'farm_watch_auth_token',
                    JSON.stringify(code)
                );
                localStorage.setItem(
                    'farm_watch_auth_state',
                    JSON.stringify(state)
                );
                // window.location.reload();
            } else {
                setLoading(false);
                Toast('error', data.detail.error);
            }
        } else {
            Toast('error', 'Invalid state');
        }
    };

    const fetchLocalData = () => {
        //check if data exists in local storage, if yes, update state
        const localUserData = localStorage.getItem('farm_watch_user');
        const localToken = localStorage.getItem('farm_watch_auth_token');
        const localState = localStorage.getItem('farm_watch_auth_state');
        if (localToken) {
            setToken(localToken);
        }
        if (localState) {
            setAuthState(localState);
        }
        if (localUserData) {
            let parsedLocalUserData = JSON.parse(localUserData);
            const { display_name, img } = parsedLocalUserData;
            setIsAuthenticated(true);
            setDisplayName(display_name);
            setDisplayPicture(img.href);
        }
    };

    const login = async () => {
        setLoading(true);
        const authWindow = window.open(
            osmAuthUrl,
            'farmWatchAuthWindow',
            params
        );
        const checkAuthWindow = setInterval(() => {
            if (
                authWindow?.window.location.href.includes('code') &&
                authWindow?.window.location.href.includes('state')
            ) {
                var stateAndCode = authWindow?.window.location.href.split(
                    'http://127.0.0.1:3000/?code=' //refactor
                )[1];
                var code = stateAndCode.split('&')[0];
                var state = stateAndCode.split('&state=')[1];
                authenticateUser(code, state);
                authWindow.close();
            }
            if (!authWindow || !authWindow.closed) return;
            clearInterval(checkAuthWindow);
        }, 1000);
    };

    const logOut = async () => {
        localStorage.removeItem('farm_watch_user');
        localStorage.removeItem('farm_watch_auth_token');
        localStorage.removeItem('farm_watch_auth_state');
        setDisplayName(null);
        setDisplayPicture(null);
        setToken(null);
        setAuthState(null);
        setIsAuthenticated(false);
        Toast('success', 'Logout successfully');
    };

    useEffect(() => {
        if (displayName || displayPicture || token || authState) return;
        fetchLocalData();
    }, [authState, displayPicture, displayName, token]);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                login,
                displayName,
                displayPicture,
                loading,
                token,
                authState,
                logOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
