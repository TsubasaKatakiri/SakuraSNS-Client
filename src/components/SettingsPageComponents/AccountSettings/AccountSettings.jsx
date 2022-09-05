import React from 'react';
import classes from './AccountSettings.module.scss';
import PasswordSettings from './PasswordSettings/PasswordSettings';

const AccountSettings = ({profile, currentUser, token, changeSettings, changePassword}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <section className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.category}>
                <h4 className={classes.categoryHeader}>Change Password</h4>
                <span className={classes.categoryCaption}>You can change your password here.</span>
                <PasswordSettings profile={profile} currentUser={currentUser} token={token} changePassword={changePassword}/>
            </div>
        </section>
    );
};

export default AccountSettings;