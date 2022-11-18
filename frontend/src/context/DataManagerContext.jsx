import { React, useContext, createContext, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { APIRoutes, BASE_URL } from '../utils/services';
import { Toast } from '../utils/toast';

const DataManagerContext = createContext();

export const useDataManagerContext = () => useContext(DataManagerContext);

const maxSize = 10 * 1024 * 1024;

const DataManagerProvider = ({ children }) => {
    const [activeTabId, setActiveTabId] = useState(1);
    const [file, setFile] = useState();
    const [dataset, setDataset] = useState(null);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'application/geo+json': ['.geojson', '.json'],
            // 'application/vnd.google-earth.kml+xml': ['.kml'],
            // 'application/zip': ['.zip'], //shapefile
        },
        maxSize: maxSize,
        multiple: false,
        onDrop: (acceptedFiles) => {
            setFile(acceptedFiles[0]);
        },
    });
    const [isLoading, setIsLoading] = useState(false);

    const uploadDataset = async () => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('files', file);

            const response = await fetch(
                `${BASE_URL}${APIRoutes.UPLOAD_DATA}`,
                {
                    method: 'POST',
                    body: formData,
                }
            );
            const data = await response.json();

            if (response.status === 200) {
                setIsLoading(false);
                setDataset(data.data);
                Toast('success', 'Data uploaded successfully');
            } else {
                setIsLoading(false);
                Toast('error', `${data.detail}`);
            }
        } catch (error) {
            setIsLoading(false);
            Toast('error', 'Error uploading data}');
        }
    };

    const deleteDataset = async (id) => {
        return;
    };
    const updateDataset = async (id) => {
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
                activeTabId,
                setActiveTabId,
                isLoading,
                setIsLoading,
                file,
                setFile,
                dataset,
                setDataset,
            }}
        >
            {children}
        </DataManagerContext.Provider>
    );
};

export default DataManagerProvider;
