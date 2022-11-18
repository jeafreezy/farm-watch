import React from 'react';

type TtabItems = {
    tabItems: {
        id: number;
        toolTipName: string;
        icon: JSX.Element;
        isActive: boolean;
    }[];
    activeTabId: number;
    setActiveTabId: (value: number) => void;
};

const NavTabs = ({ tabItems, activeTabId, setActiveTabId }: TtabItems) => {
    const handleMenuClick = (id: number) => {
        setActiveTabId(id);
    };

    return (
        <nav className="pt-2">
            <ul className="flex">
                {tabItems
                    .filter((tab) => tab.isActive === true)
                    .map((menu) => (
                        <li
                            onClick={() => handleMenuClick(menu.id)}
                            className={`${
                                activeTabId === menu.id &&
                                'border-b-2 border-white pb-2'
                            } mr-2 flex w-10 justify-center `}
                            key={menu.id}
                        >
                            {menu.icon}
                        </li>
                    ))}
            </ul>
        </nav>
    );
};

export default NavTabs;
