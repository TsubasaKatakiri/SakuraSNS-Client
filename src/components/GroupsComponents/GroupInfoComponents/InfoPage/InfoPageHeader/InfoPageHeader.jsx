import React from 'react';
import InfoIcon from '@mui/icons-material/Info';
import { ChevronLeft } from '@material-ui/icons';
import { Link, useParams } from 'react-router-dom';
import classes from './InfoPageHeader.module.scss'

const InfoPageHeader = () => {
    const groupId = useParams().groupId;
    const isDark = document.body.classList.contains('dark');

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.content}>
                <div className={classes.logo}>
                    <InfoIcon className={classes.logoIcon}/>
                    <h3 className={classes.logoText}>Information</h3>
                </div>
                <div className={classes.controlGroup}>
                    <Link to={`/groups/${groupId}/info`} className={classes.control}>
                        <ChevronLeft className={classes.controlIcon}/>
                        <span className={classes.controlCaption}>To info list</span>
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

export default InfoPageHeader;