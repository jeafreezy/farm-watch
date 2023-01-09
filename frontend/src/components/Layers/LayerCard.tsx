import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { HiOutlineDuplicate } from 'react-icons/hi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useDataManagerContext } from '../../context/DataManagerProvider';
import { capitalizeWord } from '../../utils/capitalizeWord';

type TLayerCard = {
    layer: any;
    index: number;
};

const LayerCard = ({ layer, index }: TLayerCard) => {
    const feature = layer?.features[0];
    const filename = feature?.properties?.name?.split('.')[0];
    const format = feature?.properties?.name?.split('.')[1];
    const [layerVisiblity, setLayerVisiblity] = useState(true);
    const { deleteLayer, duplicateLayer } = useDataManagerContext();
    const handleLayerVisibility = () => {
        setLayerVisiblity(!layerVisiblity);
    };
    const handleLayerDelete = () => {
        deleteLayer?.(index);
    };
    const handleDuplicate = () => {
        duplicateLayer?.(index);
    };
    return (
        <Draggable>
            <div className="App">
                {' '}
                <div className="group flex items-center justify-between gap-2 bg-brand-black p-2 font-extralight text-white opacity-80 hover:opacity-100">
                    <div className="flex flex-col">
                        <small>{filename}</small>
                        <small> {capitalizeWord(format)}</small>
                    </div>
                    <div className="flex justify-between  gap-2">
                        <div className="invisible flex gap-2 text-brand-blue-light group-hover:visible">
                            <RiDeleteBin6Line onClick={handleLayerDelete} />
                            <HiOutlineDuplicate onClick={handleDuplicate} />
                        </div>
                        <div className="flex  gap-2 text-brand-blue-light">
                            {layerVisiblity ? (
                                <AiOutlineEye onClick={handleLayerVisibility} />
                            ) : (
                                <AiOutlineEyeInvisible
                                    onClick={handleLayerVisibility}
                                />
                            )}

                            <MdKeyboardArrowDown />
                        </div>
                    </div>
                </div>
            </div>
        </Draggable>
    );
};

export default LayerCard;

//view button,
//layer settings
//dragable
//renaming
