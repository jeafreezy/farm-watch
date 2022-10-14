import SidePanelContainer from '../SidePanel/SidePanelContainer';
import Geocoder from './Geocoder';
import Map from './Map';
import MeasureControl from './MeasureControl';
import ZoomControl from './ZoomControl';

const MapContainer = () => {
    return (
        <div className="relative h-full w-full">
            <Map />
            <div className="absolute top-[50vh] left-4 space-y-2">
                <ZoomControl />
                <MeasureControl />
            </div>
            <Geocoder />
            <SidePanelContainer />
        </div>
    );
};

export default MapContainer;
