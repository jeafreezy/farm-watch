import Geocoder from './Geocoder';
import Map from './Map';
import MeasureControl from './MeasureControl';
import ZoomControl from './ZoomControl';

const MapContainer = () => {
    return (
        <div className="relative h-full w-full">
            <Map />
            <ZoomControl />
            <MeasureControl />
            <Geocoder />
        </div>
    );
};

export default MapContainer;
