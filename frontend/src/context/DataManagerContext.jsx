import { React, useContext, createContext, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const DataManagerContext = createContext();

export const useDataManagerContext = () => useContext(DataManagerContext);

const maxSize = 10 * 1024 * 1024;

const DataManagerProvider = ({ children }) => {
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'application/geo+json': ['.geojson', '.json'],
            'application/vnd.google-earth.kml+xml': ['.kml'],
            'application/zip': ['.zip'], //shapefile
        },
        maxSize: maxSize,
        multiple: false,
    });
    const [isLoading, setIsLoading] = useState(false);

    const uploadDataset = async (file) => {
        return;
    };
    const deleteDataset = async (file) => {
        return;
    };
    const updateDataset = async (file) => {
        return;
    };
    return (
        <DataManagerContext.Provider
            value={{
                getRootProps,
                getInputProps,
                uploadDataset,
                deleteDataset,
                updateDataset,
            }}
        >
            {children}
        </DataManagerContext.Provider>
    );
};

export default DataManagerProvider;
