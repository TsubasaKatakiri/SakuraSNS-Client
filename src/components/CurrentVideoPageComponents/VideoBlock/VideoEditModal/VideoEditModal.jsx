import React from 'react';
import ModalShell from '../../../MinorComponents/ModalShell/ModalShell';
import AddVideoForm from '../../../VideoPageComponents/AddVideoModal/AddVideoForm/AddVideoForm';

const VideoEditModal = ({currentUser, video, opened, setOpened, updateMethod}) => {
    const handleCancel = () => {
        setOpened(!opened);
    }

    const handleUpdate = (imageData) => {
        updateMethod(imageData);
        setOpened(!opened);
    }

    if(!opened) return <></>;

    return (
        <ModalShell handleCancel={handleCancel} caption={'Add new video'}>
            <AddVideoForm currentUser={currentUser} video={video} updateMethod={handleUpdate} cancelMethod={handleCancel}/>
        </ModalShell>
    );
};

export default VideoEditModal;