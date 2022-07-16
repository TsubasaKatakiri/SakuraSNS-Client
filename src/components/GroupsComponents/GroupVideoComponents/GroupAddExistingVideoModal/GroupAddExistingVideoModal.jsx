import React from 'react';
import ModalShell from '../../../MinorComponents/ModalShell/ModalShell';
import ExistingVideoAddForm from './ExistingVideoAddForm/ExistingVideoAddForm';

const GroupAddExistingVideoModal = ({currentUser, group, token, opened, setOpened, addMethod}) => {
    const handleCancel = () => {
        setOpened(!opened);
    }

    const handleAdd = (newAlbum) => {
        addMethod(newAlbum);
        setOpened(!opened);
    }

    if(!opened) return <></>;

    return (
        <ModalShell handleCancel={handleCancel} caption={'Add existing video'}>
            <ExistingVideoAddForm currentUser={currentUser} group={group} token={token} addMethod={handleAdd} cancelMethod={handleCancel}/>
        </ModalShell>
    );
};

export default GroupAddExistingVideoModal;