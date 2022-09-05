import React from 'react';
import { Link } from 'react-router-dom';
import { calculateCurrentDateDifference } from '../../../../../../util/DateCalculations';
import classes from './EventThumbnail.module.scss';

const EventThumbnail = ({event, group}) => {
    const daysLeft = calculateCurrentDateDifference(event.eventDate);
    const isDark = document.body.classList.contains('dark');

    return (
        <Link to={`/groups/${group._id}/event/${event._id}`} className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <h3 className={classes.name}>{event.eventName}</h3>
            <div className={classes.infoBlock}>
                <span className={classes.infoString}>Place: {event.eventLocation}</span>
                <span className={classes.infoString}>
                    {daysLeft > 0
                    ? `Date: ${new Date(event.eventDate).toLocaleString('en-US')}`
                    : 'Event already ended'}
                </span>
            </div>
        </Link>
    );
};

export default EventThumbnail;