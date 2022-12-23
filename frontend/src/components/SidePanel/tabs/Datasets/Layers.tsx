import React from 'react';
import EmptyState from '../../../ui/EmptyState';
import LayerList from './LayerList';
import LayerLoadingSkeleton from '../../../ui/skeletons/LayerLoadingSkeleton';

//todo work on logic to add layers to the map and to the layers tab from the dataset tab
// logic to enable search of datasets to add to layers tab

const LayersTab = () => {
    const layers: [] = [];

    return (
        <>
            <div className="p-2">
                <p className="font-light text-brand-blue-light">Layers (0)</p>
                {layers && layers.length > 0 ? (
                    <LayerList layersData={layers} />
                ) : layers.length === 0 ? (
                    <EmptyState
                        message={'No layers'}
                        cta={'Get started by uploading a new dataset'}
                        optionalNote={'or add layers from the dataset tab. '}
                    />
                ) : (
                    [...Array(5)].map((_) => <LayerLoadingSkeleton />)
                )}
            </div>
        </>
    );
};

export default LayersTab;
