import React from 'react';
import EventPageControls from '../EventPageControls/EventPageControls';
import EventPageDescription from '../EventPageDescription/EventPageDescription';
import EventPageHeader from '../EventPageHeader/EventPageHeader';
import classes from './EventPageContent.module.scss';
import DeletionModal from './../../../../MinorComponents/DeletionModal/DeletionModal';
import Preloader from '../../../../MinorComponents/Preloader/Preloader';

const EventPageContent = ({group, currentUser, currentEvent, joinInProgress, handleJoin, userFriends, opened, setOpened, handleDeletion, handleOpenModal, isFetching, error}) => {
    const isDark = document.body.classList.contains('dark');
    
    return (
        <div className={classes.wrapper}>
            <EventPageHeader group={group}/>
            <div className={`${classes.content} ${isDark ? classes.night : ''}`}>
                {!currentEvent || isFetching 
                ? <Preloader/>  
                : <>
                    <EventPageControls group={group} currentUser={currentUser} currentEvent={currentEvent} joinInProgress={joinInProgress} handleJoin={handleJoin} handleOpenModal={handleOpenModal}/>
                    <EventPageDescription currentEvent={currentEvent} userFriends={userFriends}/>
                </>
                }
            </div>
            <DeletionModal opened={opened} setOpened={setOpened} deleteMethod={handleDeletion}/>
        </div>
    );
};

export default EventPageContent;