import { ReactNode } from 'react';

type TToolTip = {
    children: ReactNode;
    tooltip?: string;
};

export default function ToolTip({ children, tooltip }: TToolTip) {
    return (
        <div className="group relative inline-block">
            {children}
            {tooltip ? (
                <span className="invisible absolute mx-1 whitespace-nowrap rounded-md bg-brand-black p-2  text-center text-sm  text-brand-white  group-hover:visible   ">
                    {tooltip}
                </span>
            ) : null}
        </div>
    );
}
