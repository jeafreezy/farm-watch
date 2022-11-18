import React, { ReactElement } from 'react';
import { useDataManagerContext } from '../../../context/DataManagerContext';
import NavTabs from '../NavTabs';
import { FiLayers } from 'react-icons/fi';
import { AiOutlineUpload } from 'react-icons/ai';
import DatasetTab from './tabs/Datasets/Datasets';
import LayersTab from './tabs/Layers/Layers';

type TDataManagerPanel = {
    show: boolean;
    showPanel: boolean;
};

const tabItems = [
    {
        id: 1,
        toolTipName: 'Layers',
        icon: <FiLayers size={20} />,
        isActive: true,
    },
    {
        id: 2,
        toolTipName: 'Upload Data',
        icon: <AiOutlineUpload size={20} />,
        isActive: true,
    },
];

const DataManagerPanel = ({
    show,
    showPanel,
}: TDataManagerPanel): ReactElement => {
    const { activeTabId, setActiveTabId, getInputProps, getRootProps } =
        useDataManagerContext();

    return show ? (
        <aside
            className={`${
                showPanel ? 'right-[190px] ' : 'right-[60px]'
            } absolute top-0 hidden  h-full w-[350px] cursor-pointer  border-l-2  border-r-brand-black bg-brand-black-medium font-bold  text-brand-white transition-all duration-500 md:block`}
        >
            <div className=" border-b-2 border-brand-black p-4 pb-0 pt-2 text-center text-sm font-light text-brand-blue-light ">
                <p className=" text-xl font-semibold text-white">
                    Data Manager
                </p>

                <NavTabs
                    tabItems={tabItems}
                    activeTabId={activeTabId}
                    setActiveTabId={setActiveTabId}
                />
            </div>

            {activeTabId === 2 ? (
                <DatasetTab
                    getInputProps={getInputProps}
                    getRootProps={getRootProps}
                />
            ) : activeTabId === 1 ? (
                <LayersTab />
            ) : null}
        </aside>
    ) : (
        <></>
    );
};

export default DataManagerPanel;
