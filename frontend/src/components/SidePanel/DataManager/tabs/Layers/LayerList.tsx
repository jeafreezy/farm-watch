import React from 'react';
import LayerCard from './LayerCard';

type TLayerList = {
    layersData: {
        name: string;
        id: number;
    }[];
};
const LayerList = ({ layersData }: TLayerList) => {
    return (
        <>
            {layersData.map((layer) => (
                <LayerCard layer={layer} />
            ))}
        </>
    );
};

export default LayerList;
