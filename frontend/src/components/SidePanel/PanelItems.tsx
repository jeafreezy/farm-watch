import React, { ReactElement, useState } from 'react';
import { TiWeatherCloudy } from 'react-icons/ti';
import { TbHeartRateMonitor, TbDatabase } from 'react-icons/tb';
import DataManagerPanel from './DataManager/BaseContainer';
import UserProfile from './UserProfile';

var ICON_SIZE = 25;

const panelItems = [
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

type TPanelItems = {
    name: string;
    icon: JSX.Element;
};

const PanelItems = ({ showPanel }: { showPanel: boolean }): ReactElement => {
    const [showDataManagerPanel, setDataManagerSidePanel] = useState(false);

    const handleItemClickEvent = (item: TPanelItems) => {
        if (item.name === 'Data manager') {
            setDataManagerSidePanel(!showDataManagerPanel);
        }
    };

    return (
        <>
            <div className='flex justify-between flex-col h-full '>
                <div>
                    {panelItems.map((item, id) => {
                        return (
                            <div
                                key={id}
                                onClick={() => handleItemClickEvent(item)}
                                className=" mt-4 flex  items-center  gap-2 overflow-x-hidden text-brand-blue-light  hover:text-brand-blue"
                            >
                                {' '}
                                {item.icon}
                                {showPanel && item.name}
                            </div>
                        );
                    })}
                </div>
            <UserProfile showPanel={showPanel} />
            </div>
            <DataManagerPanel
                show={showDataManagerPanel}
                showPanel={showPanel}
            />
        </>
    );
};

export default PanelItems;
