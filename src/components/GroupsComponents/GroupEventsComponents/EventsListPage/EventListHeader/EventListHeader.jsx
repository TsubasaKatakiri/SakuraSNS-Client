import React from 'react';
import classes from './EventListHeader.module.scss';
import EventIcon from '@mui/icons-material/Event';
import { Link } from 'react-router-dom';
import { Add, ChevronLeft } from '@material-ui/icons';
import { checkPolicy } from '../../../../../util/CheckPolicy';

const EventListHeader = ({currentUser, group}) => {
    const isDark = document.body.classList.contains('dark');
    const isAllowed = checkPolicy(group, currentUser._id, group.policies.canSetEvents);

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.content}>
                <div className={classes.logo}>
                    <EventIcon className={classes.logoIcon}/>
                    <h3 className={classes.logoText}>Group Events</h3>
                </div>
                <div className={classes.controlGroup}>
                    {isAllowed 
                    ?   <Link to={`./addEvent`} className={classes.control}>
                            <Add className={classes.controlIcon}/>
                            <span className={classes.controlCaption}>Add...</span>
                        </Link>
                    : ''}
                    <Link to={`/groups/${group._id}`} className={classes.control}>
                        <ChevronLeft className={classes.controlIcon}/>
                        <span className={classes.controlCaption}>To group</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EventListHeader;