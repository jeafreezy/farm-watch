import React, { ReactElement } from 'react';
import { useMapContext } from '../../context/MapContext';
import ToolTip from '../ui/ToolTip';

const ZoomControl = (): ReactElement => {
    const { mapInstance } = useMapContext();

    const handleZoomIn = () => {
        mapInstance.zoomIn();
    };
    const handleZoomOut = () => {
        mapInstance.zoomOut();
    };
    return (
        <div className="flex  flex-col ">
            <ToolTip tooltip="Zoom In">
                <button
                    className="zoom-controls relative rounded-t-lg"
                    onClick={handleZoomIn}
                >
                    +
                </button>
            </ToolTip>
            <ToolTip tooltip="Zoom Out">
                <button
                    className=" zoom-controls rounded-b-lg  "
                    onClick={handleZoomOut}
                >
                    −
                </button>
            </ToolTip>
        </div>
    );
};

export default ZoomControl;
