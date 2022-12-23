import React from 'react';
import { useDataManagerContext } from '../../../../context/DataManagerProvider';
import CustomButton from '../../../ui/CustomButton';
import { Spinner } from '../../../ui/Spinner';
import DatasetList from './DatasetList';
import DataUploadInfo from './DataUploadInfo';
import { useDisclosure } from '@chakra-ui/react';
import { AddDataModal } from '../../../ui/modals/AddDataModal';
import LayerList from './LayerList';

const DatasetTab = () => {
    const { loading, files, datasets, layers, uploadData } =
        useDataManagerContext();
    const { onOpen, isOpen, onClose } = useDisclosure();
    return (
        <>
            <AddDataModal isOpen={isOpen} onClose={onClose} />
            <div className="flex flex-col  gap-2 p-2">
                <div className="flex  w-full flex-col  gap-2">
                    <div className="flex items-center justify-between">
                        <p className="font-light text-brand-blue-light">
                            Datasets ({datasets?.length})
                        </p>
                        <CustomButton variant="secondary" action={onOpen}>
                            Add Data
                        </CustomButton>
                    </div>

                    {datasets?.length === 0 ? null : (
                        <DatasetList datasets={datasets} />
                    )}
                    {/* Show file information after selection */}
                    {files
                        ? files.map((file, index) => (
                              <DataUploadInfo file={file} key={index} />
                          ))
                        : null}

                    {/* Show upload file button  */}
                    {files?.length === 1 ? (
                        <CustomButton
                            variant="primary"
                            disabled={loading}
                            action={uploadData}
                        >
                            {loading ? (
                                <Spinner text="Uploading" />
                            ) : (
                                'Upload file'
                            )}
                        </CustomButton>
                    ) : null}
                </div>
                <div className="mt-10 h-[1px] w-full  bg-brand-blue-light"></div>
                <div className="  flex flex-col ">
                    <p className="mb-2 font-light text-brand-blue-light">
                        Layers ({layers?.length})
                    </p>
                    {layers?.length === 0 ? null : (
                        <LayerList layersData={layers} />
                    )}
                </div>
            </div>
        </>
    );
};

export default DatasetTab;
