import React from 'react';
import DeletionModal from '../../../../MinorComponents/DeletionModal/DeletionModal';
import Preloader from '../../../../MinorComponents/Preloader/Preloader';
import InfoBlock from '../InfoBlock/InfoBlock';
import InfoEditModal from '../InfoEditModal/InfoEditModal';
import InfoPageHeader from '../InfoPageHeader/InfoPageHeader';
import classes from './InfoPageContent.module.scss';

const InfoPageContent = ({currentUser, token, infoBlock, group, isFetching, error, openedEdit, setOpenedEdit, handleOpenEdit, openedDelete, setOpenedDelete, handleOpenDelete, editMethod, deleteMethod}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <InfoPageHeader/>
            <div className={classes.content}>
                {!infoBlock || isFetching
                    ? <Preloader/>
                    : <>{!infoBlock && error 
                        ? <span className={classes.message}>{error}</span>
                        : <InfoBlock currentUser={currentUser} group={group} infoBlock={infoBlock} handleOpenDelete={handleOpenDelete} handleOpenEdit={handleOpenEdit}/>}
                    </>
                }
            </div>
            <DeletionModal opened={openedDelete} setOpened={setOpenedDelete} deleteMethod={deleteMethod}/>
            <InfoEditModal currentUser={currentUser} token={token} group={group} infoBlock={infoBlock} opened={openedEdit} setOpened={setOpenedEdit} editMethod={editMethod}/>
        </div>
    );
};

export default InfoPageContent;