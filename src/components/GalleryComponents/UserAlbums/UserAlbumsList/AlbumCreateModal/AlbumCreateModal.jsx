import React from 'react';
import ModalShell from '../../../../MinorComponents/ModalShell/ModalShell';
import AlbumCreationForm from './AlbumCreationForm/AlbumCreationForm';

const AlbumCreateModal = ({currentUser, group, album, opened, setOpened, createMethod, updateMethod}) => {
    const handleCancel = () => {
        setOpened(!opened);
    }

    const handleCreate = (newAlbum) => {
        createMethod(newAlbum);
        setOpened(!opened);
    }

    const handleUpdate = (newAlbum) => {
        updateMethod(newAlbum);
        setOpened(!opened);
    }

    if(!opened) return <></>;

    return (
        <ModalShell handleCancel={handleCancel} caption={updateMethod ? 'Edit album' : 'Add new album'}>
            <AlbumCreationForm currentUser={currentUser} group={group} album={album} cancelMethod={handleCancel} createMethod={handleCreate} updateMethod={handleUpdate}/>
        </ModalShell>
    );
};

export default AlbumCreateModal;