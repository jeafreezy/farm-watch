import React, { useState, useContext, createContext } from 'react';

// Stores all users data in localStorage

const SessionContext = createContext({});

export const useSessionContext = () => useContext(SessionContext);

const SessionProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [sessionData, setSessionData] = useState();
    const value = {
        sessionData,
        setSessionData,
    };
    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    );
};

export default SessionProvider;
