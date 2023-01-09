import React from 'react';
import { TbPolygon } from 'react-icons/tb';
import { HiGlobeAlt } from 'react-icons/hi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdPlaylistAdd } from 'react-icons/md';
import { useDisclosure } from '@chakra-ui/react';
import DeleteModal from '../ui/modals/DeleteModal';
import { useDataManagerContext } from '../../context/DataManagerProvider';
const DatasetCard = ({ data, index }: { data: any; index: number }) => {
    const feature = data?.features[0];
    const { onOpen, onClose, isOpen } = useDisclosure();
    const { deleteDataset, getDatasetLayers, addDatasetToLayers } =
        useDataManagerContext();
    const handleDataRemoval = () => {
        deleteDataset?.(index);
        onClose();
    };
    const handleAddDataToLayers = () => {
        addDatasetToLayers?.(index);
    };
    const filename = feature?.properties?.name;
    return (
        <>
            <DeleteModal
                isOpen={isOpen}
                onClose={onClose}
                action={handleDataRemoval}
                filename={filename}
                layerCount={getDatasetLayers?.(index)}
            />
            <div className="group flex flex-col gap-2 bg-brand-black p-2 font-extralight text-white opacity-80 hover:opacity-100">
                <div className="flex items-center justify-between gap-2">
                    <small>{filename}</small>
                    <div className="invisible flex gap-2 group-hover:visible">
                        <div>
                            <RiDeleteBin6Line onClick={() => onOpen()} />
                        </div>
                        <div>
                            <MdPlaylistAdd onClick={handleAddDataToLayers} />
                        </div>
                    </div>
                </div>

                <small>{data?.features?.length} rows</small>
                <div className="flex gap-1">
                    <span>
                        <TbPolygon size={20} />
                    </span>
                    <small>{feature?.geometry?.type}</small>
                </div>
                <div className="flex gap-1">
                    <span>
                        <HiGlobeAlt size={20} />
                    </span>
                    <small>{feature?.properties?.crs?.init}</small>
                </div>
            </div>
        </>
    );
};

export default DatasetCard;
