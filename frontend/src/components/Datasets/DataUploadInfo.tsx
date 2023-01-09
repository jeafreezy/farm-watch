import React from 'react';
import { bytesToMb } from '../../utils/bytesToMb';
import { wordTrimmer } from '../../utils/wordWrapper';

type TDataUploadInfo = {
    file: File;
};
const DataUploadInfo = ({ file }: TDataUploadInfo) => {
    return (
        <div className="bg-brand-black p-2 font-extralight text-white">
            <small>
                <span className="font-normal">Name: </span>{' '}
                {wordTrimmer(file?.name.split('.')[0])}
            </small>
            <br></br>
            <small>
                <span className="font-normal">Size: </span>
                {bytesToMb(file.size)}
            </small>
        </div>
    );
};

export default DataUploadInfo;
