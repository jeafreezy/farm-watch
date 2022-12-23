import { createContext, useContext, useState } from 'react';
import Alert from '../components/Alert';
import { DataManagerService } from '../services/DataManagerService';
export type TDataManagerContext = {
    loading?: boolean;
    setLoading?: (loading: boolean) => void;
    activeTab?: number;
    setActiveTab?: (activeTab: number) => void;
    files?: File[];
    setFiles?: (file: []) => void;
    uploadData?: () => void;
    datasets?: Array<Object>;
    setDatasets?: (datasets: Array<Object>) => void;
    layers?: Array<Object>;
    setLayers?: (layers: Array<Object>) => void;
};

const DataManagerContext = createContext<TDataManagerContext>({});

export const useDataManagerContext = () => useContext(DataManagerContext);
const DataManagerProvider = ({ children }: React.PropsWithChildren) => {
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState(1);
    const [files, setFiles] = useState([]);
    const [datasets, setDatasets] = useState<Array<Object>>([]);
    const [layers, setLayers] = useState<Array<Object>>([]);
    async function uploadData() {
        setLoading(true);
        var formData = new FormData();
        formData.append('files', files[0]);

        const { data, status } = await DataManagerService.uploadData(formData);

        if (status === 200) {

            //only add to layers panel is there is no data existing there
            if (layers.length === 0) {
                setLayers([data.data]);
            }
            setDatasets([...datasets, data.data]);
            setLoading(false);
            Alert('success', 'upload successfully');
            setFiles([]);
        } else {
            setLoading(false);
            setFiles([]);
            Alert('error', `${data}`);
        }
    }

    return (
        <DataManagerContext.Provider
            value={{
                loading,
                setLoading,
                activeTab,
                setActiveTab,
                files,
                setFiles,
                uploadData,
                datasets,
                layers,
            }}
        >
            {children}
        </DataManagerContext.Provider>
    );
};

export default DataManagerProvider;
