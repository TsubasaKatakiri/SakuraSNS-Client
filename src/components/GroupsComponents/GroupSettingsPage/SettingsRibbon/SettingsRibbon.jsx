import React from 'react';
import InfoSettings from '../InfoSettings/InfoSettings';
import classes from './SettingsRibbon.module.scss';
import { ChevronLeft, Settings } from '@material-ui/icons';
import PoliciesSettings from '../PoliciesSettings/PoliciesSettings';
import UsersSettings from '../UsersSettings/UsersSettings';
import ManagementSettings from '../ManagementSettings/ManagementSettings';
import { Link } from 'react-router-dom';

const SettingsRibbon = ({currentUser, token, group, updateGroupPolicies, updateGroupInfo}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.content}>
                <div className={classes.header}>
                    <div className={classes.logo}>
                        <Settings className={classes.logoIcon}/>
                        <h3 className={classes.logoText}>Group Settings</h3>
                    </div>
                    <div className={classes.controlGroup}>
                        <Link to={`/groups/${group._id}`} className={classes.control}>
                            <ChevronLeft className={classes.controlIcon}/>
                            <span className={classes.controlCaption}>To group</span>
                        </Link>
                    </div>
                </div>
                <div className={classes.main}>
                    <h3 className={classes.categoryHeader} id={'info'}>Info settings</h3>
                    <InfoSettings currentUser={currentUser} token={token} group={group} updateGroupInfo={updateGroupInfo}/>
                    <h3 className={classes.categoryHeader} id={'policies'}>Policies settings</h3>
                    <PoliciesSettings currentUser={currentUser} token={token} group={group} updateGroupPolicies={updateGroupPolicies}/>
                    <h3 className={classes.categoryHeader} id={'users'}>Users controls</h3>
                    <UsersSettings currentUser={currentUser} token={token} group={group}/>
                    <h3 className={classes.categoryHeader} id={'management'}>Management</h3>
                    <ManagementSettings currentUser={currentUser} token={token} group={group}/>
                </div>
            </div>
        </div>
    );
};

export default SettingsRibbon;