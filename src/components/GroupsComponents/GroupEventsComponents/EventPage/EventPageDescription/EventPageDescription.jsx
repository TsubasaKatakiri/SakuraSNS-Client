import React from 'react';
import classes from './EventPageDescription.module.scss';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WarningIcon from '@mui/icons-material/Warning';
import { calculateCurrentDateDifference } from '../../../../../util/DateCalculations';
import { Link } from 'react-router-dom';

const EventPageDescription = ({currentEvent, userFriends}) => {
    const daysLeft = calculateCurrentDateDifference(currentEvent.eventDate);
    const joinedFriends = currentEvent.participants.filter(p => userFriends.includes(p._id));

    return (
        <div className={classes.wrapper}>
            <div className={classes.infoBlock}>
                <div className={classes.info}>
                    <LocationOnIcon className={classes.infoIcon}/>
                    <span className={classes.infoHeader}>Location:&nbsp;</span>{currentEvent.eventLocation}
                </div>
                <div className={classes.info}>
                    <AccessTimeIcon className={classes.infoIcon}/>
                    <span className={classes.infoHeader}>Date and time:&nbsp;</span>{new Date(currentEvent.eventDate).toLocaleString('en-US')}
                </div>
                {daysLeft < 0
                    ? <span className={classes.message}>
                        <WarningIcon className={classes.messageIcon}/>This event is already ended.
                    </span>
                    : ''
                }
                {joinedFriends > 0 
                    ? <span className={classes.friendList}>{joinedFriends.map((joined, index) => {
                        return <Link to={`../${joined._id}`} key={joined._id} className={classes.friend}>{joined.username}{joinedFriends.length < index ? ', ' : ''}</Link>
                        })} will also participate in this event.</span>
                    : ''
                }
            </div>
            <p className={classes.description}>{currentEvent.eventDescription}</p>
            <div className={classes.imageContainer}>
                <img src={currentEvent.eventImage} alt='' className={classes.image}/>
            </div>
        </div>
    );
};

export default EventPageDescription;