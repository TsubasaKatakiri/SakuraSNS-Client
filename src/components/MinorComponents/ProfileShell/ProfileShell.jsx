import React from 'react';
import classes from './ProfileShell.module.scss';
import coverPlaceholder from '../../../images/noCoverPicture.png';
import avatarPlaceholder from '../../../images/noAvatar.png';

const ProfileShell = ({cover, avatar, children}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.content}>
                <div className={classes.top}>
                    <div className={classes.coverContainer}>
                        <img className={classes.cover} src={cover ? cover : coverPlaceholder} alt=''/>
                    </div>
                    <div className={classes.avatarContainer}>
                        <img className={classes.avatar} src={avatar ? avatar : avatarPlaceholder} alt=''/>
                    </div>
                </div>
                <div className={classes.bottom}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ProfileShell;