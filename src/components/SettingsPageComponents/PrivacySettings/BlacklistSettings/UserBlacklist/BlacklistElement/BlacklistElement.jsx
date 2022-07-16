import React from 'react';
import classes from './BlacklistElement.module.scss';
import avatar from '../../../../../../images/noAvatar.png';
import SimpleButton from '../../../../../MinorComponents/SimpleButton/SimpleButton';

const BlacklistElement = ({user, removeMethod, isDark}) => {
    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.info}>
                <img src={user.profilePicture ? user.profilePicture : avatar} alt='' className={classes.infoAvatar}/>
                <div className={classes.user}>
                    <span className={classes.userName}>{user.username}</span>
                    <span className={classes.userId}>User ID: {user._id}</span>
                </div>
            </div>
            <SimpleButton className={classes.button} onClick={() => removeMethod(user._id)}>Remove</SimpleButton>
        </div>
    );
};

export default BlacklistElement;