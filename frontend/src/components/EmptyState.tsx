import React from 'react';

type TEmptyState = {
    message: string;
    cta: string;
    optionalNote: string;
};
const EmptyState = ({ message, cta, optionalNote }: TEmptyState) => {
    return (
        <div className="mt-4 flex flex-col items-center justify-center  rounded-sm border-2 border-dashed border-brand-blue-light p-4 ">
            <p className="font-bold">{message}</p>
            <p className="font-light">{cta}</p>
            {optionalNote ? (
                <small className="font-thin">{optionalNote}</small>
            ) : null}
        </div>
    );
};

export default EmptyState;
