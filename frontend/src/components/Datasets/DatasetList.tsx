import React from 'react';
import DatasetCard from './DatasetCard';

type TLayerList = {
    datasets?: Array<Object>;
};
const DatasetList = ({ datasets }: TLayerList) => {
    return (
        <div className="flex max-h-[40vh] flex-col gap-1 overflow-y-auto">
            {datasets?.map((data: any, index: number) => (
                <DatasetCard data={data} key={index} index={index} />
            ))}
        </div>
    );
};

export default DatasetList;
