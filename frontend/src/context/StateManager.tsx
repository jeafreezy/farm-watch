import DataManagerProvider from './DataManagerProvider';
import AuthProvider from './AuthProvider';
import React from 'react';
import MapProvider from './MapContext';

const StateManager = ({ children }: React.PropsWithChildren) => (
    <AuthProvider>
        <DataManagerProvider>
            <MapProvider>{children}</MapProvider>
        </DataManagerProvider>
    </AuthProvider>
);

export default StateManager;
