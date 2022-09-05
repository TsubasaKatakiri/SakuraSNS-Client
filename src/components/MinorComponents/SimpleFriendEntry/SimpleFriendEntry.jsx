import React from 'react';
import { Link } from 'react-router-dom';
import classes from './SimpleFriendEntry.module.scss';
import avatar from '../../../images/noAvatar.png'

const SimpleFriendEntry = ({friend, onlineUsers}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <Link to={`/profile/${friend._id}`} className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.avatarContainer}>
                <img src={friend.profilePicture ? friend.profilePicture : avatar} alt='' className={classes.avatar}/>
                <div className={`${classes.isOnline} ${onlineUsers.some(user => user.userId === friend._id) ? classes.online : ''}`}/>
            </div>
            <div className={classes.username}>{friend.username}</div>
        </Link>
    );
};

export default SimpleFriendEntry;