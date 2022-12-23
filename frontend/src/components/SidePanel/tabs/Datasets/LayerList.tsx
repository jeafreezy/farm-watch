import React from 'react';
import LayerCard from './LayerCard';

type TLayerList = {
    layersData: any;
};
const LayerList = ({ layersData }: TLayerList) => {
    return (
        <div className="flex max-h-[40vh] flex-col gap-2 overflow-y-auto">
            {layersData.map((layer: any, index: number) => (
                <LayerCard layer={layer} key={index} />
            ))}
        </div>
    );
};

export default LayerList;
