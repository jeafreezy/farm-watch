import { useDropzone } from 'react-dropzone';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useCallback } from 'react';
import { useDataManagerContext } from '../../context/DataManagerProvider';
import { Divider } from '@chakra-ui/react';
export default function FileUploadContainer({ onClose }: { onClose: any }) {
    const { setFiles } = useDataManagerContext();
    const onDrop = useCallback(
        (acceptedFiles: any) => {
            // Do something with the files
            setFiles?.(acceptedFiles);
            onClose();
        },
        [setFiles]
    );
    // const maxSize = 10 * 1024 * 1024;
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: false,
        // maxSize: maxSize,
        // maxFiles: 3,
        accept: {
            'application/geo+json': ['.geojson', '.json'],
            // 'application/vnd.google-earth.kml+xml': ['.kml'],
            // 'application/zip': ['.zip'], //shapefile
        },
    });
    return (
        <div className="m-4 flex flex-col gap-2">
            <h1 className="text-lg">Add Data To Map</h1>
            <Divider />
            <div className="font-light">
                Supported formats:{' '}
                <span className="font-semibold">GeoJSON</span> or{' '}
                <span className="font-semibold">KML.</span>
            </div>
            <div
                {...getRootProps()}
                className=" flex h-[300px]  flex-col items-center justify-center rounded-lg border-[1px] border-dashed border-gray-300  p-2  text-center text-base font-light text-brand-black-medium"
            >
                <AiOutlineCloudUpload size={35} className="animate-bounce" />
                <input {...getInputProps()}></input>
                <span>
                    <span className="cursor-pointer underline">
                        Browse your files
                    </span>{' '}
                    or drop files to upload
                </span>
            </div>
        </div>
    );
}
