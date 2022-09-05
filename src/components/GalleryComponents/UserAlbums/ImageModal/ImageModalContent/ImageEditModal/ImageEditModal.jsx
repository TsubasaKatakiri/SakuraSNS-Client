import React from 'react';
import ModalShell from '../../../../../MinorComponents/ModalShell/ModalShell';
import ImageEditModalForm from './ImageEditModalForm/ImageEditModalForm';

const ImageEditModal = ({currentUser, group, profile, album, image, opened, setOpened, updateMethod}) => {
    const handleCancel = () => {
        setOpened(!opened);
    }

    const handleUpdate = (imageData) => {
        updateMethod(imageData);
        setOpened(!opened);
    }

    if(!opened) return <></>;

    return (
        <ModalShell handleCancel={handleCancel} caption={'Edit image'}>
            <ImageEditModalForm currentUser={currentUser} group={group} currentAlbum={album} albumList={group ? group.imageAlbums : profile.imageAlbums} image={image} updateMethod={handleUpdate} cancelMethod={handleCancel}/>
        </ModalShell>
    );
};


export default ImageEditModal;