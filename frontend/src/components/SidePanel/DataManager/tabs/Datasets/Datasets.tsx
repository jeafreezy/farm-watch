import React from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useDataManagerContext } from '../../../../../context/DataManagerContext';
import EmptyState from '../../../../EmptyState';
import LayerLoadingSkeleton from '../Layers/LayerLoadingSkeleton';
import DatasetList from './DatasetList';
import DataUploadInfo from './DataUploadInfo';

type TDataUploadTab = {
    getInputProps: any;
    getRootProps: any;
};

// {file ? <DataUploadInfo file={file} /> : null}

const DatasetTab = ({ getInputProps, getRootProps }: TDataUploadTab) => {
    const { file, isLoading, uploadDataset } = useDataManagerContext();
    const datasets: [] = [];

    return (
        <div className="p-2">
            <p className="font-light text-brand-blue-light">Datasets (0)</p>
            {datasets && datasets.length > 0 ? (
                <DatasetList dataset={datasets} />
            ) : datasets.length === 0 ? (
                <EmptyState
                    message={'No dataset'}
                    cta={'Get started by uploading a new dataset'}
                    optionalNote={''}
                />
            ) : (
                [...Array(5)].map((_) => <LayerLoadingSkeleton />)
            )}
            {datasets.length === 0 ? (
                <FileUploadContainer
                    getInputProps={getInputProps}
                    getRootProps={getRootProps}
                />
            ) : null}
            {file ? <DataUploadInfo file={file} /> : null}
            {file ? (
                <div className="absolute bottom-0 right-[1px] flex w-full justify-center p-4">
                    <button
                        className=" w-full  cursor-pointer rounded-lg bg-brand-blue p-4 hover:bg-brand-black"
                        disabled={isLoading}
                        onClick={uploadDataset}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center space-x-4">
                                {' '}
                                <div className="h-2 w-2  animate-spin bg-white"></div>{' '}
                                <span>Loading... </span>
                            </div>
                        ) : (
                            '+ UPLOAD DATA'
                        )}
                    </button>
                </div>
            ) : null}
        </div>
    );
};

export default DatasetTab;

const FileUploadContainer = ({
    getInputProps,
    getRootProps,
}: TDataUploadTab) => {
    return (
        <div
            {...getRootProps()}
            className=" mt-2 flex h-60 flex-col items-center justify-center rounded-lg border-2 border-dashed border-brand-blue bg-brand-blue bg-opacity-20 p-2  text-center text-base font-light text-brand-blue-light"
        >
            <AiOutlineCloudUpload size={35} className="animate-bounce" />
            <input {...getInputProps()}></input>
            <span className=" font-bold text-white">
                <span className="text-brand-blue underline">Click here</span> or
                drop files to upload
            </span>
            <span>
                Supported formats: Zipped Esri Shapefile (*SHP,*SHX,*DBF,*PRJ),
                GeoJSON, KML.
            </span>
            <span>Maximum upload size: 10MB</span>
        </div>
    );
};
