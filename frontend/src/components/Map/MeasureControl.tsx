import React, { ReactElement } from 'react';
import { RiRulerLine } from 'react-icons/ri';
import ToolTip from '../ui/ToolTip';

const MeasureControl = (): ReactElement => {
    return (
        <ToolTip tooltip="Measure distance">
            <button className="zoom-controls  rounded-lg p-2">
                <RiRulerLine />
            </button>
        </ToolTip>
    );
};

export default MeasureControl;
