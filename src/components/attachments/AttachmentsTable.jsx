import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import DeleteIconButton from "components/ui/buttons/DeleteIconButton";
import SecondaryButton from "components/ui/buttons/Secondary";
import FileSizeSpan from "components/ui/FileSizeSpan";
import Loading from "components/ui/Loading";
import ModalDialog from "components/ui/ModalDIalog";
import RelativeDateFormatter from "components/ui/RelativeDateFormatter";
import NoResultsTableRow from "components/ui/tables/NoResultsTableRow";
import UserLink from "components/users/Link";
import { resolveMime } from 'friendly-mimes';
import useDelete from "hooks/useDelete";
import { useState } from "react";
import secureApiFetch from "services/api";

const AttachmentsTable = ({ attachments, reloadAttachments }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [content, setContent] = useState(null);

    const onModalClose = () => {
        setModalVisible(false);
    }

    const deleteAttachmentById = useDelete('/attachments/', reloadAttachments);

    const onViewClick = (ev, attachmentId) => {
        secureApiFetch(`/attachments/${attachmentId}`, { method: 'GET', headers: {} })
            .then(resp => {
                const contentDispositionHeader = resp.headers.get('Content-Disposition');
                const contentType = resp.headers.get('Content-Type');
                const filenameRe = new RegExp(/filename="(.*)";/)
                const filename = filenameRe.exec(contentDispositionHeader)[1]
                return Promise.all([contentType, filename, resp.blob()]);
            })
            .then(async (values) => {
                const [contentType, , blob] = values;

                if (contentType.indexOf('image/') !== -1) {
                    setContent(<img src={await URL.createObjectURL(blob)} alt="" />);
                    // @todo -> URL.revokeObjectURL
                } else {
                    setContent(<textarea style={{ width: '100%', height: '90%' }} value={await blob.text()} readOnly />);
                }
                setModalVisible(true);
            })
    }

    const onDownloadClick = (ev, attachmentId) => {
        secureApiFetch(`/attachments/${attachmentId}`, { method: 'GET', headers: {} })
            .then(resp => {
                const contentDispositionHeader = resp.headers.get('Content-Disposition');
                const filenameRe = new RegExp(/filename="(.*)";/)
                const filename = filenameRe.exec(contentDispositionHeader)[1]
                return Promise.all([resp.blob(), filename]);
            })
            .then((values) => {
                const blob = values[0];
                const filename = values[1];
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                a.click();
            })
    }

    const onDeleteAttachmentClick = (ev, attachmentId) => {
        deleteAttachmentById(attachmentId)
            .then(() => reloadAttachments());
    }

    const safeResolveMime = mimeType => {
        try {
            return resolveMime(mimeType)['name']
        } catch (err) {
            console.error(err);
            return mimeType;
        }
    }

    if (!attachments) {
        return <Loading />
    }

    return <>
        <ModalDialog visible={modalVisible} title="Preview output" onModalClose={onModalClose} style={{ overflow: 'auto', width: '80%', height: '80%', maxHeight: '80%' }}>
            {content}
        </ModalDialog>

        <Table>
            <Thead>
                <Tr>
                    <Th>Filename</Th>
                    <Th>Mimetype</Th>
                    <Th>File size</Th>
                    <Th>Upload date</Th>
                    <Th>Uploaded by</Th>
                    <Th>&nbsp;</Th>
                </Tr>
            </Thead>
            <Tbody>
                {attachments.length === 0 && <NoResultsTableRow numColumns={6} />}
                {attachments.map((attachment, index) =>
                    <Tr key={index}>
                        <Td>{attachment.client_file_name}</Td>
                        <Td><span title={safeResolveMime(attachment.file_mimetype)}>{attachment.file_mimetype}</span></Td>
                        <Td><FileSizeSpan fileSize={attachment.file_size} /></Td>
                        <Td><RelativeDateFormatter date={attachment.insert_ts} /></Td>
                        <Td><UserLink userId={attachment.submitter_uid}>{attachment.submitter_name}</UserLink></Td>
                        <Td style={{ display: "flex" }}>
                            <SecondaryButton onClick={ev => onViewClick(ev, attachment.id)}>View</SecondaryButton>
                            <SecondaryButton onClick={ev => onDownloadClick(ev, attachment.id)}>Download</SecondaryButton>
                            <DeleteIconButton onClick={ev => onDeleteAttachmentClick(ev, attachment.id)} />
                        </Td>
                    </Tr>
                )}
            </Tbody>
        </Table>
    </>
}

export default AttachmentsTable;
