import React, { useEffect, ReactElement } from 'react';
import maplibregl from 'maplibre-gl';

const Map = (): ReactElement => {
    useEffect(() => {
        new maplibregl.Map({
            container: 'mapContainer',
            center: [-122.420679, 37.772537],
            zoom: 13,
            hash: true,
            style: 'https://demotiles.maplibre.org/style.json',
        });
    }, []);

    return <div className="absolute h-full w-full" id="mapContainer"></div>;
};

export default Map;
