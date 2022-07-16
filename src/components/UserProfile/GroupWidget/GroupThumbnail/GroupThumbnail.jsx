import React from 'react';
import { Link } from 'react-router-dom';
import classes from './GroupThumbnail.module.scss';
import avatar from '../../../../images/noAvatar.png';

const GroupThumbnail = ({group}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <Link to={`../groups/${group._id}`} className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.previewContainer}>
                <img src={group.profilePicture ? group.profilePicture : avatar} alt='' className={classes.image}/>
            </div>
            <div className={classes.infoContainer}>
                <h4 className={classes.name}>{group.groupname}</h4>
            </div>
        </Link>
    );
};

export default GroupThumbnail;