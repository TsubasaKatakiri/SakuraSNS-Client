import React from 'react';
import { Link } from 'react-router-dom';
import classes from './SimpleUserEntry.module.css';
import avatar from '../../../images/noAvatar.png';

const SimpleUserEntry = ({user}) => {
    return (
        <Link to={`/profile/${user._id}`} className={classes.link}>
            <div className={classes.friend}>
                <img src={user.profilePicture ? user.profilePicture : avatar} alt='' className={classes.friendAvatar}/>
                <div className={classes.friendInfo}>
                    <span className={classes.friendName}>{user.username}</span>
                </div>
            </div>
        </Link>
    );
};

export default SimpleUserEntry;