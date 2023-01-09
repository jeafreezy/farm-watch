import { createContext, useContext, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';

const MapContext = createContext();

export const useMapContext = () => useContext(MapContext);
const MapProvider = ({ children }) => {
    const [mapInstance, setMapInstance] = useState(null);
    useEffect(() => {
        const map = new maplibregl.Map({
            container: 'mapContainer',
            center: [-122.420679, 37.772537],
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
