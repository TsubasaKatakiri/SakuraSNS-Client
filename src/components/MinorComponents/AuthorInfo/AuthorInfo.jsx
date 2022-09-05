import React from 'react';
import { Link } from 'react-router-dom';
import classes from './AuthorInfo.module.scss'
import avatar from "../../../images/noAvatar.png";

const AuthorInfo = ({user}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <Link to={`/profile/${user._id}`} className={`${classes.author} ${isDark ? classes.night : ''}`}>
            <img className={classes.authorAvatar} src={user.profilePicture ? user.profilePicture : avatar} alt="avatar"/>
            <span className={classes.authorUsername}>{user.username}</span>
        </Link>
    );
};

export default AuthorInfo;