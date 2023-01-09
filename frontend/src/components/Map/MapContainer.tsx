import Geocoder from './Geocoder';
import Map from './Map';
import ZoomControl from './ZoomControl';
import React, { ReactElement } from 'react';
const MapContainer = (): ReactElement => {
    return (
        <div className="relative h-full w-full overflow-hidden rounded-r-lg">
            <Map />
            <div className="absolute top-[50vh] left-4 space-y-2">
                <ZoomControl />
                {/* <MeasureControl /> */}
            </div>
            <Geocoder />
        </div>
    );
};

export default MapContainer;
