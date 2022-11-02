import { React } from 'react';
import DataManagerProvider from './DataManagerContext';

const StateManager = ({ children }) => (
    <DataManagerProvider>{children}</DataManagerProvider>
);

export default StateManager;
