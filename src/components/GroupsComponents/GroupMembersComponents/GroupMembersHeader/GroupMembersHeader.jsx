import React from 'react';
import PeopleSearchForm from '../../../PeopleComponents/PeopleSearchForm/PeopleSearchForm';
import classes from './GroupMembersHeader.module.scss';
import { ChevronLeft, People } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const GroupMembersHeader = ({groupId, query, setQuery, resetPeople}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.content}>
                <div className={classes.logo}>
                    <People className={classes.logoIcon}/>
                    <h3 className={classes.logoText}>Group members</h3>
                </div>
                <PeopleSearchForm searchQuery={query} setSearchQuery={setQuery} resetPeople={resetPeople}/>
                <div className={classes.controlGroup}>
                    <Link to={`../${groupId}`} className={classes.control}>
                        <ChevronLeft className={classes.controlIcon}/>
                        <span className={classes.controlCaption}>To group</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default GroupMembersHeader;