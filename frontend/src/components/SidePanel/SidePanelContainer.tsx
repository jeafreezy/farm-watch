import React, { useState, useRef } from 'react';
import PanelItems from './PanelItems';
import { GiHamburgerMenu } from 'react-icons/gi';

const SidePanelContainer = () => {
    const [showPanel, setShowPanel] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    const handleHamBurgerClickEvent = () => {
        if (sidebarRef && sidebarRef.current) {
            sidebarRef.current?.classList.toggle('active');
            setShowPanel(!showPanel);
        }
    };

    return (
        <div
            ref={sidebarRef}
            className={` absolute right-0 hidden h-full w-[60px]  cursor-pointer  border-l-2 border-l-brand-black bg-brand-black-medium p-4 text-brand-white transition-all  duration-500 md:block`}
        >
            <GiHamburgerMenu
                size={25}
                className="text-brand-blue-light  hover:text-brand-blue"
                onClick={handleHamBurgerClickEvent}
            />

            <PanelItems showPanel={showPanel} />
        </div>
    );
};

export default SidePanelContainer;
