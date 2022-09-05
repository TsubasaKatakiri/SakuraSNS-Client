import React from 'react';
import classes from './ProfileSettings.module.scss';
import UserAdditionalInfoSettings from './UserAdditionalInfoSettings/UserAdditionalInfoSettings';
import UserAvatarSettings from './UserAvatarSettings/UserAvatarSettings';
import UserCoverPictureSettings from './UserCoverPictureSettings/UserCoverPictureSettings';
import UserInfoSettings from './UserInfoSettings/UserInfoSettings';

const ProfileSettings = ({profile, currentUser, token, changeSettings, changeExtraData}) => {
    const isDark = document.body.classList.contains('dark');
    
    return (
        <section className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.category}>
                <h4 className={classes.categoryHeader}>User information settings</h4>
                <span className={classes.categoryCaption}>You can change your primary personal profile information here.</span>
                <UserInfoSettings profile={profile} currentUser={currentUser} token={token} changeSettings={changeSettings}/>
            </div>
            <div className={classes.category}>
                <h4 className={classes.categoryHeader}>User avatar</h4>
                <span className={classes.categoryCaption}>Set up your avatar here.</span>
                <UserAvatarSettings profile={profile} currentUser={currentUser} token={token} changeSettings={changeSettings}/>
            </div>
            <div className={classes.category}>
                <h4 className={classes.categoryHeader}>User profile header picture</h4>
                <span className={classes.categoryCaption}>You can change your personal profile header picture here.</span>
                <UserCoverPictureSettings profile={profile} currentUser={currentUser} token={token} changeSettings={changeSettings}/>
            </div>
            <div className={classes.category}>
                <h4 className={classes.categoryHeader}>User additional information</h4>
                <span className={classes.categoryCaption}>Set up or change your addtitonal information such as education, hobbies, personal preferences, links to the other social network services, etc.</span>
                <UserAdditionalInfoSettings profile={profile} currentUser={currentUser} token={token} changeExtraData={changeExtraData}/>
            </div>
        </section>
    );
};

export default ProfileSettings;