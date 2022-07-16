import React from 'react';
import classes from './EventPageHeader.module.scss';
import EventIcon from '@mui/icons-material/Event';
import { Link } from 'react-router-dom';
import { ChevronLeft } from '@material-ui/icons';

const EventPageHeader = ({group}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.content}>
                <div className={classes.logo}>
                    <EventIcon className={classes.logoIcon}/>
                    <h3 className={classes.logoText}>Event overview</h3>
                </div>
                <div className={classes.controlGroup}>
                    <Link to={`/groups/${group._id}/event`} className={classes.control}>
                        <ChevronLeft className={classes.controlIcon}/>
                        <span className={classes.controlCaption}>To event list</span>
                    </Link>
                    <Link to={`/groups/${group._id}`} className={classes.control}>
                        <ChevronLeft className={classes.controlIcon}/>
                        <span className={classes.controlCaption}>To group</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EventPageHeader;