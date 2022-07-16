import { Settings } from '@material-ui/icons';
import React from 'react';
import Preloader from '../../MinorComponents/Preloader/Preloader';
import AccountSettings from '../AccountSettings/AccountSettings';
import ContentSettings from '../ContentSettings/ContentSettings';
import PrivacySettings from '../PrivacySettings/PrivacySettings';
import ProfileSettings from '../ProfileSettings/ProfileSettings';
import classes from './SettingsRibbon.module.scss';

const SettingsRibbon = ({currentUser, token, profile, isFetching, changeSettings, changeExtraSettings, changeExtraData, changePassword}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.content}>
                <header className={classes.header}>
                    <div className={classes.logo}>
                        <Settings className={classes.logoIcon}/>
                        <h3 className={classes.logoText}>User Preferences</h3>
                    </div>
                </header>
                <main className={classes.main}>
                    {!profile || isFetching 
                    ? <Preloader/>
                    :   <>
                            <h3 className={classes.categoryHeader} id={'profile'}>Profile settings</h3>
                            <ProfileSettings profile={profile} currentUser={currentUser} token={token} changeSettings={changeSettings} changeExtraData={changeExtraData}/>
                            <h3 className={classes.categoryHeader} id={'content'}>User content</h3>
                            <ContentSettings currentUser={currentUser}/>
                            <h3 className={classes.categoryHeader} id={'privacy'}>Privacy</h3>
                            <PrivacySettings profile={profile} currentUser={currentUser} token={token} changeSettings={changeExtraSettings}/>
                            <h3 className={classes.categoryHeader} id={'account'}>Account settings</h3>
                            <AccountSettings profile={profile} currentUser={currentUser} token={token} changeSettings={changeSettings} changePassword={changePassword}/>
                        </>
                    } 
                </main>
            </div>
        </div>
    );
};

export default SettingsRibbon;