import React from 'react';
import classes from './GroupsHeader.module.scss';
import GroupsIcon from '@mui/icons-material/Groups';
import { Link } from 'react-router-dom';
import { Create, Group } from '@material-ui/icons';
import GroupsSearchForm from '../GroupsSearchForm/GroupsSearchForm';

const GroupsHeader = ({currentUser, commonMode, userMode, query, setQuery, resetResults}) => {
    const isDark = currentUser.userSettings.isDarkMode;

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.content}>
                <div className={classes.logo}>
                    <GroupsIcon className={classes.logoIcon}/>
                    <h3 className={classes.logoText}>Groups</h3>
                </div>
                <GroupsSearchForm isDark={isDark} searchQuery={query} setQuery={setQuery} resetResults={resetResults}/>
                <div className={classes.controlGroup}>
                    <Link to={'./create'} className={classes.control}>
                        <Create className={classes.controlIcon}/>
                        <span className={classes.controlCaption}>Create</span>
                    </Link>
                    <Link to={`/groups`} className={`${classes.control} ${commonMode ? classes.active : ''}`}>
                        <GroupsIcon className={classes.controlIcon}/>
                        <span className={classes.controlCaption}>Groups</span>
                    </Link>
                    <Link to={`/groups/user/${currentUser._id}`} className={`${classes.control} ${userMode ? classes.active : ''}`}>
                        <Group className={classes.controlIcon}/>
                        <span className={classes.controlCaption}>My groups</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default GroupsHeader;