import React from 'react';

type TLayerCard = {
    layer: {
        name: string;
        id: number;
    };
};

const LayerCard = ({ layer }: TLayerCard) => {
    return <div>{layer.name}</div>;
};

export default LayerCard;
