import React from 'react';
import ModalShell from '../../../MinorComponents/ModalShell/ModalShell';
import ExistingAudioAddForm from './ExistingAudioAddForm/ExistingAudioAddForm';

const GroupAddExistingAudioModal = ({currentUser, group, token, opened, setOpened, addMethod}) => {
    const handleCancel = () => {
        setOpened(!opened);
    }

    const handleAdd = (newTrack) => {
        addMethod(newTrack);
        setOpened(!opened);
    }

    if(!opened) return <></>;

    return (
        <ModalShell handleCancel={handleCancel} caption={'Add existing track'}>
            <ExistingAudioAddForm currentUser={currentUser} group={group} token={token} addMethod={handleAdd} cancelMethod={handleCancel}/>
        </ModalShell>
    );
};

export default GroupAddExistingAudioModal;