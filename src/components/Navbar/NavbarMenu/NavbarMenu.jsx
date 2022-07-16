import React from 'react';
import classes from './NavbarMenu.module.scss';
import noAvatar from '../../../images/noAvatar.png';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const NavbarMenu = ({currentUser, profileHandler, logoutHandler, settingsHandler, isOpened, darkHandler}) => {
    const isDark = document.body.classList.contains('dark');

    if(!isOpened) return <></>

    return (
        <div id='menu' className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.info}>
                <img className={classes.infoAvatar} src={currentUser.profilePicture ? currentUser.profilePicture : noAvatar} alt='' onClick={profileHandler}/>
                <div className={classes.infoStrings}>
                    <span className={classes.infoUsername}>{currentUser.username ? currentUser.username : currentUser.login}</span>
                    <span className={classes.infoEmail}>{currentUser.email}</span>
                </div>
            </div>
            <ul className={classes.menu}>
                <li className={classes.menuItem} onClick={darkHandler}>
                    <div className={classes.menuItemContent}>
                        <DarkModeIcon className={classes.menuItemIcon}/>
                        <span className={classes.menuItemText}>Night mode: {isDark ? 'on' : 'off'}</span>
                    </div>
                </li>
                <li className={classes.menuItem} onClick={settingsHandler}>
                    <div className={classes.menuItemContent}>
                        <SettingsIcon className={classes.menuItemIcon}/>
                        <span className={classes.menuItemText}>Settings & Privacy</span>
                    </div>
                    <ArrowForwardIosIcon className={classes.ArrowForwardIosIcon}/>
                </li>
                <li className={classes.menuItem} onClick={logoutHandler}>
                    <div className={classes.menuItemContent}>
                        <LogoutIcon className={classes.menuItemIcon}/>
                        <span className={classes.menuItemText}>Logout</span>
                    </div>
                    <ArrowForwardIosIcon className={classes.ArrowForwardIosIcon}/>
                </li>
            </ul>
        </div>
    );
};

export default NavbarMenu;