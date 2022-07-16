import React from 'react';
import ModalShell from '../../MinorComponents/ModalShell/ModalShell';
import AddVideoForm from './AddVideoForm/AddVideoForm';

const AddVideoModal = ({currentUser, group, opened, setOpened, addMethod}) => {
    const handleCancel = () => {
        setOpened(!opened);
    }

    const handleAdd = (newAlbum) => {
        addMethod(newAlbum);
        setOpened(!opened);
    }

    if(!opened) return <></>;

    return (
        <ModalShell handleCancel={handleCancel} caption={'Add new video'}>
            <AddVideoForm currentUser={currentUser} group={group} addMethod={handleAdd} cancelMethod={handleCancel}/>
        </ModalShell>
    );
};

export default AddVideoModal;