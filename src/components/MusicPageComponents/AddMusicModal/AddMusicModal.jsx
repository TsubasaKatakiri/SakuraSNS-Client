import React from 'react';
import ModalShell from '../../MinorComponents/ModalShell/ModalShell';
import AddMusicForm from './AddMusicForm/AddMusicForm';

const AddMusicModal = ({currentUser, group, opened, setOpened, addMethod}) => {
    const handleCancel = () => {
        setOpened(!opened);
    }

    const handleAdd = (newAudio) => {
        addMethod(newAudio);
        setOpened(!opened);
    }

    if(!opened) return <></>;

    return (
        <ModalShell handleCancel={handleCancel} caption={'Add new track'}>
            <AddMusicForm currentUser={currentUser} group={group} cancelMethod={handleCancel} uploadMethod={handleAdd}/>
        </ModalShell>
    );
};

export default AddMusicModal;