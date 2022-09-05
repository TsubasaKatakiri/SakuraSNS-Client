import React, { useState } from 'react';
import classes from './EventPageControls.module.scss';
import { calculateCurrentDateDifference } from './../../../../../util/DateCalculations';
import { useNavigate } from 'react-router-dom';
import { checkPolicy } from '../../../../../util/CheckPolicy';
import SimpleButton from './../../../../MinorComponents/SimpleButton/SimpleButton';

const EventPageControls = ({group, currentUser, currentEvent, joinInProgress, handleJoin, handleOpenModal}) => {
    const isDark = document.body.classList.contains('dark');
    const isAllowed = checkPolicy(group, currentUser._id, group.policies.canSetEvents);
    const daysLeft = calculateCurrentDateDifference(currentEvent.eventDate);
    const [joined, setJoined] = useState(currentEvent.participants.some(p=> p._id === currentUser._id));
    const navigate = useNavigate();

    const handleJoinControl = () => {
        handleJoin();
        setJoined(!joined);
    }

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <h3 className={classes.name}>{currentEvent.eventName}</h3>
            <div className={classes.controls}>
                <span className={classes.infoString}>{currentEvent.participants.length} participants</span>
                <SimpleButton onClick={handleJoinControl} disabled={joinInProgress || daysLeft < 0}>
                    {daysLeft >= 0 
                    ? <>{joined 
                            ? (joinInProgress ? 'Joining...' : 'Leave Event') 
                            : (joinInProgress ? 'Leaving...' : 'Join event')
                        }</>
                    : 'Event ended'}
                </SimpleButton>
                {isAllowed 
                    ?   <>
                        <SimpleButton onClick={() => navigate(`./edit`)}>Edit</SimpleButton>
                        <SimpleButton onClick={handleOpenModal}>Delete</SimpleButton>
                    </>
                    : ''
                }
            </div>
        </div>
    );
};

export default EventPageControls;