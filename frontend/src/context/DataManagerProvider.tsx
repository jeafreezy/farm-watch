import { createContext, useContext, useEffect, useState } from 'react';
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
    deleteDataset?: (index: number) => void;
    deleteLayer?: (index: number) => void;
    duplicateLayer?: (index: number) => void;
    getDatasetLayers?: (datasetID: number) => number;
    addDatasetToLayers?: (datasetID: number) => void;
};

type TLayers = {
    datasetID?: number;
    data?: Object;
};
const DataManagerContext = createContext<TDataManagerContext>({});

export const useDataManagerContext = () => useContext(DataManagerContext);
const DataManagerProvider = ({ children }: React.PropsWithChildren) => {
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState(1);
    const [files, setFiles] = useState([]);
    const [datasets, setDatasets] = useState<Array<Object>>([]);
    //schema = {datasetID:number,data:{},settings:{}}
    const [layers, setLayers] = useState<Array<TLayers>>([]);

    const getDatasetLayers = (datasetID: number) =>
        layers.filter((layer, index) => layer?.datasetID === datasetID).length;
    async function uploadData() {
        setLoading(true);
        var formData = new FormData();
        formData.append('files', files[0]);

        const { data, status } = await DataManagerService.uploadData(formData);

        if (status === 200) {
            //only add to layers panel is there is no data existing there
            if (layers.length === 0) {
                setLayers([{ datasetID: datasets.length, data: data.data }]);
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
    const deleteDataset = (index: number) => {
        setDatasets(datasets.filter((_, idx) => idx !== index));
        setLayers(layers.filter((layer) => layer.datasetID !== index));
    };
    const addDatasetToLayers = (datasetID: number) => {
        const data = datasets.filter((_, index) => index === datasetID)[0];
        setLayers([...layers, { datasetID: datasetID, data: data }]);
    };

    const duplicateLayer = (index: number) => {
        setLayers([...layers, ...layers.filter((_, idx) => idx === index)]);
    };
    const deleteLayer = (index: number) => {
        setLayers(layers.filter((_, idx) => idx !== index));
    };

    useEffect(() => {
        setDatasets(
            JSON.parse(localStorage.getItem('farm_watch_datasets') || '[]')
        );
        setLayers(
            JSON.parse(localStorage.getItem('farm_watch_layers') || '[]')
        );
    }, []);

    useEffect(() => {
        localStorage.setItem('farm_watch_datasets', JSON.stringify(datasets));
    }, [datasets]);

    useEffect(() => {
        localStorage.setItem('farm_watch_layers', JSON.stringify(layers));
    }, [layers]);

    return (
        <DataManagerContext.Provider
            value={{
                loading,
                setLoading,
                activeTab,
                setActiveTab,
                deleteDataset,
                files,
                setFiles,
                uploadData,
                datasets,
                layers,
                deleteLayer,
                getDatasetLayers,
                addDatasetToLayers,
                duplicateLayer,
            }}
        >
            {children}
        </DataManagerContext.Provider>
    );
};

export default DataManagerProvider;
