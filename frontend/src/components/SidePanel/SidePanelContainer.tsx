import React, { ReactElement } from 'react';
import { useDataManagerContext } from '../../context/DataManagerProvider';
import { tabItems } from '../../utils/constants';
import DataTab from './DataTab';
import InteractionsTab from '../Interactions/InteractionsTab';

const SidePanelContainer = (): ReactElement => {
    const { setActiveTab, activeTab } = useDataManagerContext();
    const handleMenuClick = (id: number) => {
        setActiveTab?.(id);
    };
    return (
        <aside className=" h-[93vh] cursor-pointer  rounded-lg bg-brand-black-medium">
            <div className=" border-b-2 border-brand-black py-4 px-2 pb-0 text-center  text-brand-blue-light ">
                <nav>
                    <ul className="flex gap-2">
                        {tabItems
                            .filter((tab) => tab.isActive === true)
                            .map((menu) => (
                                <li
                                    onClick={() => handleMenuClick(menu.id)}
                                    className={`${
                                        activeTab === menu.id &&
                                        'border-b-2 border-white pb-2'
                                    }  flex w-10 justify-center `}
                                    key={menu.id}
                                >
                                    <menu.icon size={20} />
                                </li>
                            ))}
                    </ul>
                </nav>
            </div>
            {activeTab === 2 ? (
                <InteractionsTab />
            ) : activeTab === 1 ? (
                <DataTab />
            ) : null}
        </aside>
    );
};

export default SidePanelContainer;
