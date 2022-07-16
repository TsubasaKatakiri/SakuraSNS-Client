import React from 'react';
import classes from './GroupCard.module.scss';
import avatar from '../../../../images/noAvatar.png';
import { Link } from 'react-router-dom';

const GroupCard = ({group, isDark}) => {
    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.avatarContainer}>
                <img src={group.profilePicture ? group.profilePicture : avatar} alt='avatar' className={classes.avatar}/>
            </div>
            <div className={classes.infoContainer}>
                <div className={classes.profileInfo}>
                    <Link to={`/groups/${group._id}`} className={classes.username}>{group.groupname}</Link>
                    <span className={classes.topic}>{group.theme}</span>
                    <span className={classes.infoString}>{group.members.length} members</span>
                    <div className={classes.profileLocation}>
                        <span className={classes.infoString}>{group.groupCity},</span>
                        <span className={classes.infoString}>{group.groupCountry}</span>
                    </div>
                    <p className={classes.infoString}>{group.description}</p>
                </div>
            </div>
        </div>
    );
};

export default GroupCard;