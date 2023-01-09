import React from 'react';
import Draggable from 'react-draggable';
import LayerCard from './LayerCard';

type TLayerList = {
    layersData: any;
};
const LayerList = ({ layersData }: TLayerList) => {
    return (
        <div className="flex max-h-[40vh] flex-col gap-2 overflow-y-auto">
            {layersData.map((layer: any, index: number) => (
                <LayerCard
                    layer={layer.data}
                    key={layer.datasetID}
                    index={index}
                />
            ))}
        </div>
    );
};

export default LayerList;
