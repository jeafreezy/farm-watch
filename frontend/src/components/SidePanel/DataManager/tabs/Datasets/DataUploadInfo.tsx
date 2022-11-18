import React from 'react';

type TDataUploadInfo = {
    file: {
        name: string;
        size: number;
    };
};
const DataUploadInfo = ({ file }: TDataUploadInfo) => {
    const bytesToMb = (bytes: number) => {
        if (bytes > 1024) {
            return (bytes / (1024 * 1024)).toFixed(2) + 'MB';
        } else if (bytes < 1024) {
            return (bytes / 1024).toFixed(2) + 'KB';
        }
    };

    return (
        <div className="p-2 font-light">
            <small className="font-light">
                Name: {file.name.split('.')[0]}
            </small>
            <br></br>
            <small>Size: {bytesToMb(file.size)}</small>
        </div>
    );
};

export default DataUploadInfo;
