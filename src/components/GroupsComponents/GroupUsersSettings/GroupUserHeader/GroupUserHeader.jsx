import React from 'react';
import classes from './GroupUserHeader.module.scss';
import { People, Settings, ChevronLeft, Add } from '@material-ui/icons';
import PeopleSearchForm from '../../../PeopleComponents/PeopleSearchForm/PeopleSearchForm';
import { Link, useParams } from 'react-router-dom';
import BlockIcon from '@mui/icons-material/Block';

const GroupUserHeader = ({group, commonMode, banMode, requestMode, query, setQuery, resetPeople}) => {
    const isDark = document.body.classList.contains('dark');
    const groupId = useParams().groupId;

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.content}>
                <div className={classes.logo}>
                    <Settings className={classes.logoIcon}/>
                    <h3 className={classes.logoText}>Users</h3>
                </div>
                <PeopleSearchForm searchQuery={query} setSearchQuery={setQuery} resetPeople={resetPeople}/>
                <div className={classes.controlGroup}>
                    <Link to={'./'} className={`${classes.control} ${commonMode ? classes.active : ''}`}>
                        <People className={classes.controlIcon}/>
                        <span className={classes.controlCaption}>Users</span>
                    </Link>
                    <Link to={`./bans`} className={`${classes.control} ${banMode ? classes.active : ''}`}>
                        <BlockIcon className={classes.controlIcon}/>
                        <span className={classes.controlCaption}>Bans</span>
                    </Link>
                    <Link to={`./requests`} className={`${classes.control} ${requestMode ? classes.active : ''}`}>
                        <Add className={classes.controlIcon}/>
                        <span className={classes.controlCaption}>Requests</span>
                    </Link>
                    <Link to={`/groups/${groupId}/settings`} className={classes.control}>
                        <ChevronLeft className={classes.controlIcon}/>
                        <span className={classes.controlCaption}>Settings</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default GroupUserHeader;