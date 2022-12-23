import { FiLayers } from 'react-icons/fi';
import { IconType } from 'react-icons/lib';
import { HiOutlineAdjustments } from 'react-icons/hi';
import { TiMap } from 'react-icons/ti';

export type TtabItems = {
    id: number;
    toolTipName: string;
    icon: IconType;
    isActive: boolean;
}[];
export const tabItems: TtabItems = [
    {
        id: 1,
        toolTipName: 'Upload Data',
        icon: FiLayers,
        isActive: true,
    },
    {
        id: 2,
        toolTipName: 'Interactions',
        icon: HiOutlineAdjustments,
        isActive: false,
    },
    {
        id: 3,
        toolTipName: 'Basemap',
        icon: TiMap,
        isActive: false,
    },
];
