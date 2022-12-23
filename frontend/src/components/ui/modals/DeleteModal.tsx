import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    Divider,
} from '@chakra-ui/react';
import { useDataManagerContext } from '../../../context/DataManagerProvider';
import CustomButton from '../CustomButton';
import { Spinner } from '../Spinner';

export default function DeleteModal({
    isOpen,
    onClose,
    action,
    filename,
}: {
    isOpen: any;
    onClose: any;
    action: any;
    filename: string;
}) {
    const { loading } = useDataManagerContext();
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="md">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                    <div className="m-10 flex flex-col  gap-4">
                        <Divider />
                        <div>
                            <h1>
                                Are you sure you want to delete{' '}
                                <span className="font-semibold">
                                    {filename}
                                </span>{' '}
                                ?
                            </h1>
                        </div>
                        <div className="self-end">
                            <CustomButton variant="danger" action={action}>
                                {loading ? <Spinner text="" /> : 'Delete'}
                            </CustomButton>
                        </div>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
