import { createContext, useContext, useEffect, useState } from 'react';
// Fixes map not loading in production:/https://github.com/maplibre/maplibre-gl-js/issues/1011
// eslint-disable-next-line import/no-webpack-loader-syntax
import maplibregl from '!maplibre-gl';
import maplibreglWorker from 'maplibre-gl/dist/maplibre-gl-csp-worker';
import { useDataManagerContext } from './DataManagerProvider';
import uuid from 'react-uuid';
maplibregl.workerClass = maplibreglWorker;
const MapContext = createContext();

//todo: assign random ID to datasets from BE to use in manipulating sources
export const useMapContext = () => useContext(MapContext);
const MapProvider = ({ children }) => {
    const [mapInstance, setMapInstance] = useState(null);
    //access layers to interactively add or remove from the map
    const { layers } = useDataManagerContext();
    useEffect(() => {
        if (!layers.length > 0) return;
        layers.map((layer) => {
            const randomID = uuid();
            //create a source
            mapInstance.addSource(`${randomID}`, {
                type: 'geojson',
                data: layer.data,
            });

            //add to map
            mapInstance.addLayer({
                id: `${randomID}`,
                type: 'line',
                source: `${randomID}`,
                paint: {
                    'line-color': '#088', //use a random color pallette
                    'line-opacity': 0.8,
                },
            });

            //todo:zoom to layer
        });
    }, [layers]);
    useEffect(() => {
        const map = new maplibregl.Map({
            container: 'mapContainer',
            center: [6.420679, 8.772537],
            zoom: 4,
            hash: true,
            minZoom: 0,
            maxZoom: 20,
            style: 'https://demotiles.maplibre.org/style.json',
        });
        setMapInstance(map);
    }, []);
    return (
        <MapContext.Provider
            value={{
                mapInstance,
            }}
        >
            {children}
        </MapContext.Provider>
    );
};

export default MapProvider;
