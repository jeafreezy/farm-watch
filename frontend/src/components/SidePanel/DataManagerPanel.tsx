import React, { ReactElement } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
type DataManagerPanelProps = {
    show: boolean;
    showPanel: boolean;
};

const DataManagerPanel = ({
    show,
    showPanel,
}: DataManagerPanelProps): ReactElement => {
    return show ? (
        <aside
            className={`${
                showPanel ? 'right-[190px] ' : 'right-[60px]'
            } absolute top-0 hidden  h-full w-[350px] cursor-pointer  border-l-2  border-r-brand-black bg-brand-black-medium font-bold  text-brand-white transition-all duration-500 md:block`}
        >
            <div className=" border-b-2 border-brand-black p-4 text-center text-sm font-light text-brand-blue-light ">
                <p className=" text-xl font-semibold text-white">Data</p>
                <span>0/10mb</span>
            </div>

            <div className="m-2 flex h-60 flex-col items-center justify-center rounded-lg border-2 border-dashed border-brand-blue bg-brand-blue bg-opacity-20 p-4  text-center text-base font-light text-brand-blue-light">
                <AiOutlineCloudUpload size={35} />
                <span className=" font-bold text-white">
                    <span className="text-brand-blue underline">
                        Click here
                    </span>{' '}
                    or drop files to upload
                </span>
                <span>
                    Supported formats: Zipped Esri Shapefile
                    (*SHP,*SHX,*DBF,*PRJ), GeoJSON, KML.
                </span>
                <span>Maximum upload size: 10MB</span>
            </div>
            <div className="absolute bottom-0 flex w-full justify-center p-4">
                <button className=" w-full  rounded-lg bg-brand-blue p-4">
                    + ADD DATASET
                </button>
            </div>
        </aside>
    ) : (
        <></>
    );
};

export default DataManagerPanel;
