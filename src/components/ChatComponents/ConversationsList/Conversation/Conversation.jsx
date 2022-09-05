import React from 'react';
import classes from './Conversation.module.scss';
import avatar from '../../../../images/noAvatar.png';

const Conversation = ({user, current, conversationId}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <div className={`${classes.conversation} ${conversationId === current ? classes.current : ''} ${isDark ? classes.night : ''}`}>
            <img src={user.profilePicture ? user.profilePicture : avatar} alt='' className={classes.avatar}/>
            <span className={classes.name}>{user?.username}</span>
        </div>
    );
};

export default Conversation;