import { React } from 'react';
import DataManagerProvider from './DataManagerContext';
import AuthProvider from './AuthContext';

const StateManager = ({ children }) => (
    <AuthProvider>
        <DataManagerProvider>{children}</DataManagerProvider>
    </AuthProvider>
);

export default StateManager;
