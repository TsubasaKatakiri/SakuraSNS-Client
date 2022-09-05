import React from 'react';
import ModalShell from '../../../../MinorComponents/ModalShell/ModalShell';
import ImageAddForm from './ImageAddForm/ImageAddForm';

const ImageAddModal = ({currentUser, group, album, opened, setOpened, addMethod}) => {
    const handleCancel = () => {
        setOpened(!opened);
    }

    const handleAdd = (newAlbum) => {
        addMethod(newAlbum);
        setOpened(!opened);
    }

    if(!opened) return <></>;

    return (
        <ModalShell handleCancel={handleCancel} caption={'Add new image'}>
            <ImageAddForm currentUser={currentUser} group={group} album={album} cancelMethod={handleCancel} addMethod={handleAdd}/>
        </ModalShell>
    );
};

export default ImageAddModal;