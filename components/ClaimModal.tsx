/* eslint-disable no-unused-vars */
import {
    Button,
    chakra,
    HStack,
    IconButton,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Spinner,
    Text,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { useFileUpload } from 'use-file-upload';
import { MdRemoveCircleOutline } from 'react-icons/md';

interface PoolModalProps {
    onClose: () => void;
}

const FileBox = chakra(({ id, file, remove, ...props }) => {
    return (
        <HStack bg="pink.500" justify="space-between" {...props}>
            <Text pl="2" color="white" noOfLines={1}>
                {file.name}
            </Text>
            {remove && (
                <IconButton
                    isRound
                    colorScheme="pink"
                    icon={<MdRemoveCircleOutline />}
                    aria-label="remove"
                    onClick={() => remove(id)}
                />
            )}
            {!remove && <Spinner size="sm" />}
        </HStack>
    );
});

const ReadingForm: FC<{ files: any[]; setFiles: (a: any[]) => void }> = ({ files, setFiles }) => {
    const [file, selectFile] = useFileUpload();

    const removeFile = (id: string) => {
        const newFiles = files.filter(({ id: idfile }) => idfile !== id);
        setFiles(newFiles);
    };

    return (
        <>
            <Text mb="5">
                Filling a claim will require a couple of files and a description of the events. This
                information will be part of the jugedment process at the Kleros protocol. 5 days are
                estimated until we can get a resolution. The provided evidence must be certified for
                local authorities or implicated third parties as described in the signed contract.{' '}
                <chakra.span fontWeight="bold">
                    This process will modify your trust score.
                </chakra.span>{' '}
                An appeal instance is not provided by this protocol.
            </Text>

            {files &&
                files.map(({ id, file }) => (
                    <FileBox
                        mb="10px !important"
                        key={id}
                        id={id}
                        file={file}
                        remove={removeFile}
                    />
                ))}

            <Button
                colorScheme="pink"
                size="sm"
                onClick={() =>
                    selectFile({ accept: 'application/pdf', multiple: false }, (file) =>
                        setFiles([...files, { id: Math.random().toString().substring(2), file }]),
                    )
                }
            >
                Attach a file
            </Button>
        </>
    );
};

const UploadingForm: FC<{ files: any[] }> = ({ files }) => {
    return (
        <>
            <Text>Please, do not close this window.</Text>
            <Text mb="5">Uploading files to IPFS</Text>

            {files &&
                files.map(({ id, file }) => (
                    <FileBox mb="10px !important" key={id} id={id} file={file} />
                ))}

            <Text>
                Once finished uploading the files, confirm and send the transaction on your wallet.
            </Text>
        </>
    );
};

export const ClaimModal: FC<PoolModalProps> = ({ onClose }) => {
    const [files, setFiles] = useState<any[]>([]);
    const [status, setStatus] = useState<'reading_form' | 'uploading_form'>('reading_form');

    return (
        <>
            <ModalHeader bg="pink.500" color="white">
                Package robbed policy
            </ModalHeader>
            <ModalBody>
                {status === 'reading_form' && <ReadingForm files={files} setFiles={setFiles} />}
                {status === 'uploading_form' && <UploadingForm files={files} />}
            </ModalBody>

            <ModalFooter>
                <Button
                    variant="ghost"
                    colorScheme="pink"
                    mr={3}
                    onClick={onClose}
                    disabled={status !== 'reading_form'}
                >
                    Close
                </Button>
                <Button
                    colorScheme="pink"
                    mr={3}
                    onClick={() => setStatus('uploading_form')}
                    disabled={files.length === 0 || status !== 'reading_form'}
                    isLoading={status !== 'reading_form'}
                    loadingText="Sending"
                >
                    Fill a claim
                </Button>
            </ModalFooter>
        </>
    );
};

export default ClaimModal;
