import React from 'react';
import { capitalizeWord } from '../../../../utils/capitalizeWord';

type TLayerCard = {
    layer: any;
};

const LayerCard = ({ layer }: TLayerCard) => {
    const feature = layer?.features[0];
    const filename = feature?.properties?.name?.split('.')[0];
    const format = feature?.properties?.name?.split('.')[1];
    return (
        <div>
            {' '}
            <div className="group flex flex-col gap-2 bg-brand-black p-2 font-extralight text-white opacity-80 hover:opacity-100">
                <div className="flex flex-col">
                    <small>{filename}</small>
                    <small> {capitalizeWord(format)}</small>
                </div>
            </div>
        </div>
    );
};

export default LayerCard;
