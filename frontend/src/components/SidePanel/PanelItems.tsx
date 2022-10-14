import React from 'react';
import { TiWeatherCloudy } from 'react-icons/ti';
import { TbHeartRateMonitor, TbDatabase } from 'react-icons/tb';

var ICON_SIZE = 25;

const panelItemsArray = [
    {
        name: 'Weather',
        icon: <TiWeatherCloudy size={ICON_SIZE} />,
    },
    {
        name: 'Monitoring',
        icon: <TbHeartRateMonitor size={ICON_SIZE} />,
    },
    {
        name: 'Data manager',
        icon: <TbDatabase size={ICON_SIZE} />,
    },
];

const PanelItems = ({ showPanel }: { showPanel: boolean }) => {
    return (
        <div>
            {panelItemsArray.map((item, id) => {
                return (
                    <div
                        key={id}
                        className=" mt-4 flex  items-center  gap-2 overflow-x-hidden text-brand-blue-light  hover:text-brand-blue"
                    >
                        {' '}
                        {item.icon}
                        {showPanel && item.name}
                    </div>
                );
            })}
        </div>
    );
};

export default PanelItems;
