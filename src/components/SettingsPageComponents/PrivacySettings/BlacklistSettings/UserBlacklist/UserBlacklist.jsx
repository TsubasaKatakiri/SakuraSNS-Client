import React from 'react';
import BlacklistElement from './BlacklistElement/BlacklistElement';
import classes from './UserBlacklist.module.scss';

const UserBlacklist = ({removeMethod, blacklist, isDark}) => {
    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <h4 className={classes.header}>User blacklist</h4>
            <div className={classes.container}>
                {blacklist.map(user => {
                    return <BlacklistElement key={user._id} user={user} removeMethod={removeMethod} isDark={isDark}/>
                })}
            </div>
        </div>
    );
};

export default UserBlacklist;