import React from 'react';
import { RiRulerLine } from 'react-icons/ri';

const MeasureControl = () => {
    return (
        <div className="cursor-pointer rounded-lg  ">
            <div className="zoom-controls rounded-lg p-2 ">
                <RiRulerLine />
            </div>
        </div>
    );
};

export default MeasureControl;
