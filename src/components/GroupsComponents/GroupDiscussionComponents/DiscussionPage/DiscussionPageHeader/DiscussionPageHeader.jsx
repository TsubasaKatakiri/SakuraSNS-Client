import React from 'react';
import { Link, useParams } from 'react-router-dom';
import classes from './DiscussionPageHeader.module.scss';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import { ChevronLeft } from '@material-ui/icons';

const DiscussionPageHeader = () => {
    const groupId = useParams().groupId;
    const isDark = document.body.classList.contains('dark');

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.content}>
                <div className={classes.logo}>
                    <SpeakerNotesIcon className={classes.logoIcon}/>
                    <h3 className={classes.logoText}>Discussion</h3>
                </div>
                <div className={classes.controlGroup}>
                    <Link to={`/groups/${groupId}/discussions`} className={classes.control}>
                        <ChevronLeft className={classes.controlIcon}/>
                        <span className={classes.controlCaption}>To discussions</span>
                    </Link>
                    <Link to={`/groups/${groupId}`} className={classes.control}>
                        <ChevronLeft className={classes.controlIcon}/>
                        <span className={classes.controlCaption}>To group</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DiscussionPageHeader;