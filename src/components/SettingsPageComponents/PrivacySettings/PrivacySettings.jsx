import React from 'react';
import UserBlacklistSettings from './BlacklistSettings/UserBlacklistSettings/UserBlacklistSettings';
import classes from './PrivacySettings.module.scss';
import UserPrivacySettings from './UserPrivacySettings/UserPrivacySettings';

const PrivacySettings = ({profile, currentUser, token, changeSettings}) => {
    const isDark = document.body.classList.contains('dark');

    const updateMethod = (settingsData) => {
        changeSettings(profile._id, settingsData, token);
    }

    return (
        <section className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.category}>
                <h4 className={classes.categoryHeader}>User privacy settings</h4>
                <span className={classes.categoryCaption}>You can set your privacy here and decide what other users can see on your page.</span>
                <UserPrivacySettings currentUser={currentUser} profile={profile} updateMethod={updateMethod}/>
            </div>
            <UserBlacklistSettings/>
        </section>
    );
};

export default PrivacySettings;