import React from 'react';
import ModalShell from '../../../../MinorComponents/ModalShell/ModalShell';
import InfoCreationForm from './../../InfoListPage/InfoCreationModal/InfoCreationForm/InfoCreationForm';

const InfoEditModal = ({currentUser, token, group, infoBlock, opened, setOpened, editMethod}) => {
    const handleCancel = () => {
        setOpened(!opened);
    }

    const handleEdit = (info) => {
        editMethod(info);
        setOpened(!opened);
    }

    if(!opened) return <></>;
    
    return (
        <ModalShell handleCancel={handleCancel} caption={'Edit group info'}>
            <InfoCreationForm currentUser={currentUser} token={token} group={group} info={infoBlock} updateMethod={handleEdit} cancelMethod={handleCancel}/>
        </ModalShell>
    );
};

export default InfoEditModal;