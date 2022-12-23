import React from 'react';

type TEmptyState = {
    message: string;
    cta: string;
    optionalNote: string;
};
const EmptyState = ({ message, cta, optionalNote }: TEmptyState) => {
    return (
        <div className="mt-2 flex flex-col items-center justify-center rounded-sm border-2  border-dashed border-brand-blue-light p-2 text-center text-brand-white ">
            <p className="font-normal">{message}</p>
            <p className="font-light">{cta}</p>
            {optionalNote ? (
                <small className="font-thin">{optionalNote}</small>
            ) : null}
        </div>
    );
};

export default EmptyState;
