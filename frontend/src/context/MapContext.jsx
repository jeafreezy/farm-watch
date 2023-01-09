import { createContext, useContext, useEffect, useState } from 'react';
// Fixes map not loading in production:/https://github.com/maplibre/maplibre-gl-js/issues/1011
// eslint-disable-next-line import/no-webpack-loader-syntax
import maplibregl from '!maplibre-gl';
import maplibreglWorker from 'maplibre-gl/dist/maplibre-gl-csp-worker';
import { useDataManagerContext } from './DataManagerProvider';
maplibregl.workerClass = maplibreglWorker;
const MapContext = createContext();

export const useMapContext = () => useContext(MapContext);
const MapProvider = ({ children }) => {
    const [mapInstance, setMapInstance] = useState(null);
    //access layers to interactively add or remove from the map
    const { datasets, layers } = useDataManagerContext();

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
