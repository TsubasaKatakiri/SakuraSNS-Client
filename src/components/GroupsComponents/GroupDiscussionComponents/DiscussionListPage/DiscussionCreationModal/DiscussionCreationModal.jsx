import React from 'react';
import ModalShell from '../../../../MinorComponents/ModalShell/ModalShell';
import DiscussionCreationForm from './DiscussionCreationForm/DiscussionCreationForm';

const DiscussionCreationModal = ({currentUser, opened, setOpened, addMethod}) => {
    const handleCancel = () => {
        setOpened(!opened);
    }

    const handleAdd = (newInfo) => {
        addMethod(newInfo);
        setOpened(!opened);
    }

    if(!opened) return <></>;

    return (
        <ModalShell handleCancel={handleCancel} caption={'Add new info'}>
            <DiscussionCreationForm currentUser={currentUser} addMethod={handleAdd} cancelMethod={handleCancel}/>
        </ModalShell>
    );
};

export default DiscussionCreationModal;