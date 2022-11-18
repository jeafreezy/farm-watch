import React from 'react';
import DatasetCard from './DatasetCard';

type TLayerList = {
    dataset: {
        name: string;
        id: number;
    }[];
};
const DatasetList = ({ dataset }: TLayerList) => {
    return (
        <>
            {dataset.map((data) => (
                <DatasetCard data={data} />
            ))}
        </>
    );
};

export default DatasetList;
