import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import FileUploadContainer from '../../Datasets/FileUploader';

export function AddDataModal({
    isOpen,
    onClose,
}: {
    isOpen: any;
    onClose: any;
}) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="4xl">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                    <FileUploadContainer onClose={onClose} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
