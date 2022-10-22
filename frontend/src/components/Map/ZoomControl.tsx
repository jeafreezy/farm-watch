import React, { ReactElement } from 'react';

const ZoomControl = (): ReactElement => {
    return (
        <div className="cursor-pointer rounded-lg  ">
            <div className="zoom-controls rounded-t-lg ">+</div>
            <div className=" zoom-controls rounded-b-lg">−</div>
        </div>
    );
};

export default ZoomControl;
