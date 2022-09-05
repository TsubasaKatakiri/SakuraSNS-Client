import React from 'react';
import classes from './ChatOnline.module.scss';
import avatar from '../../../images/noAvatar.png';

const ChatOnline = ({onlineUsers, createNewConversation}) => {
    const isDark = document.body.classList.contains('dark');
    
    return (
        <section className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <h3 className={classes.header}>People online</h3>
            {onlineUsers.map(user => (
                <div onClick={() => createNewConversation(user._id)} className={classes.online} key={user._id}>
                    <img src={user.profilePicture ? user.profilePicture : avatar} alt='' className={classes.avatar}/>
                    <span className={classes.name}>{user?.username}</span>
                </div>
            ))} 
        </section>
    );
};

export default ChatOnline;