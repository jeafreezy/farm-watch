import { React } from 'react';
import DataManagerProvider from './DataManagerContext';
import SessionProvider from './SessionContext';

const StateManager = ({ children }) => (
    <SessionProvider>
        <DataManagerProvider>{children}</DataManagerProvider>
    </SessionProvider>
);

export default StateManager;
