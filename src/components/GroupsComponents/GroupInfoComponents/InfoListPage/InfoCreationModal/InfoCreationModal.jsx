import React from 'react';
import ModalShell from '../../../../MinorComponents/ModalShell/ModalShell';
import InfoCreationForm from './InfoCreationForm/InfoCreationForm';

const InfoCreationModal = ({currentUser, token, group, opened, setOpened, addMethod}) => {
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
            <InfoCreationForm currentUser={currentUser} token={token} group={group} createMethod={handleAdd} cancelMethod={handleCancel}/>
        </ModalShell>
    );
};

export default InfoCreationModal;