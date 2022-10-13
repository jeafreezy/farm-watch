import React from 'react';
import { RiRulerLine } from 'react-icons/ri';

const MeasureControl = () => {
    return (
        <div className=" absolute top-[60vh] left-4 cursor-pointer rounded-lg  ">
            <div className="zoom-controls rounded-lg p-2 ">
                <RiRulerLine />
            </div>
        </div>
    );
};

export default MeasureControl;
